import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

// バリデーションスキーマ
const profileUpdateSchema = z.object({
  display_name: z.string().min(1).max(100).optional(),
  username: z.string()
    .min(3, 'ユーザー名は3文字以上必要です')
    .max(20, 'ユーザー名は20文字以下にしてください')
    .regex(/^[a-zA-Z0-9_]+$/, '英数字とアンダースコアのみ使用できます')
    .optional(),
  bio: z.string().max(500, '自己紹介は500文字以内にしてください').optional(),
  website: z.string().url('正しいURL形式で入力してください').optional().or(z.literal('')),
  twitter: z.string().max(100).optional(),
  instagram: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  phone: z.string()
    .regex(/^[0-9-+() ]*$/, '正しい電話番号形式で入力してください')
    .optional(),
  birthday: z.string().optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional()
})

const creatorSettingsSchema = z.object({
  commission_status: z.enum(['open', 'limited', 'closed']),
  specialty: z.string().max(255),
  skills: z.array(z.string()).max(20, 'スキルは最大20個まで'),
  minimum_price: z.number()
    .min(1000, '最低価格は1000円以上に設定してください')
    .max(1000000),
  maximum_price: z.number()
    .min(1000)
    .max(10000000),
  average_delivery_days: z.number()
    .min(1)
    .max(365),
  accept_nsfw: z.boolean(),
  accept_commercial: z.boolean(),
  accept_revisions: z.boolean(),
  portfolio_url: z.string().url().optional().or(z.literal('')),
  sample_works: z.array(z.string().url()).max(6, 'サンプル作品は最大6個まで')
})

// プロフィール更新API
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey
  )

  // 認証チェック
  const token = getCookie(event, 'sb-access-token')
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: '認証が必要です'
    })
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) {
    throw createError({
      statusCode: 401,
      statusMessage: '無効な認証トークンです'
    })
  }

  const method = event.node.req.method
  const url = event.node.req.url

  // プロフィール更新
  if (url?.includes('/api/user/profile') && method === 'PUT') {
    const body = await readBody(event)
    
    // バリデーション
    const validationResult = profileUpdateSchema.safeParse(body)
    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'バリデーションエラー',
        data: validationResult.error.flatten()
      })
    }

    // XSS対策：HTMLタグを除去
    const sanitizedData = Object.entries(validationResult.data).reduce((acc, [key, value]) => {
      if (typeof value === 'string') {
        // HTMLタグを除去
        acc[key] = value.replace(/<[^>]*>/g, '')
      } else {
        acc[key] = value
      }
      return acc
    }, {} as any)

    // ユーザー名の重複チェック
    if (sanitizedData.username) {
      const { data: existingUser } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('username', sanitizedData.username)
        .neq('user_id', user.id)
        .single()

      if (existingUser) {
        throw createError({
          statusCode: 409,
          statusMessage: 'このユーザー名は既に使用されています'
        })
      }
    }

    // レート制限チェック
    const { data: rateLimitOk } = await supabase
      .rpc('check_rate_limit', {
        p_user_id: user.id,
        p_action: 'profile_update',
        p_max_attempts: 10,
        p_window_minutes: 60
      })

    if (!rateLimitOk) {
      throw createError({
        statusCode: 429,
        statusMessage: 'リクエストが多すぎます。しばらく待ってからお試しください。'
      })
    }

    // プロフィール更新
    const { data, error } = await supabase
      .from('user_profiles')
      .update(sanitizedData)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'プロフィール更新に失敗しました'
      })
    }

    // 監査ログ記録
    await supabase
      .from('audit_logs')
      .insert({
        user_id: user.id,
        action: 'profile_update',
        details: {
          updated_fields: Object.keys(sanitizedData),
          ip_address: getClientIP(event)
        }
      })

    return { success: true, data }
  }

  // クリエイター設定更新
  if (url?.includes('/api/user/creator-settings') && method === 'PUT') {
    const body = await readBody(event)
    
    // バリデーション
    const validationResult = creatorSettingsSchema.safeParse(body)
    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'バリデーションエラー',
        data: validationResult.error.flatten()
      })
    }

    // 最低価格と最高価格の整合性チェック
    if (validationResult.data.minimum_price >= validationResult.data.maximum_price) {
      throw createError({
        statusCode: 400,
        statusMessage: '最高価格は最低価格より高く設定してください'
      })
    }

    // 銀行口座情報の暗号化（存在する場合）
    let encryptedBankAccount = null
    if (body.bank_account) {
      const { data: encrypted } = await supabase
        .rpc('encrypt_bank_account', {
          p_data: body.bank_account,
          p_user_id: user.id
        })
      encryptedBankAccount = encrypted
    }

    const dataToUpdate = {
      ...validationResult.data,
      bank_account: encryptedBankAccount
    }

    // 更新
    const { data, error } = await supabase
      .from('creator_profiles')
      .upsert({
        user_id: user.id,
        ...dataToUpdate
      })
      .select()
      .single()

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'クリエイター設定の更新に失敗しました'
      })
    }

    return { success: true, data }
  }

  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found'
  })
})

// IPアドレス取得ヘルパー
function getClientIP(event: any): string {
  return event.node.req.headers['x-forwarded-for']?.split(',')[0] || 
         event.node.req.headers['x-real-ip'] ||
         event.node.req.socket.remoteAddress ||
         'unknown'
}