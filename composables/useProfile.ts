export const useProfile = () => {
  const { $supabase } = useNuxtApp()
  const { user } = useAuth()

  // プロフィール更新
  const updateProfile = async (profileData: {
    display_name?: string
    username?: string
    bio?: string
    website?: string
    twitter?: string
    instagram?: string
    location?: string
    phone?: string
    birthday?: string
    gender?: string
  }) => {
    if (!user.value) {
      throw new Error('ユーザーがログインしていません')
    }

    try {
      const { data, error } = await $supabase
        .from('privacy_settings')
        .upsert({
          user_id: user.value.id,
          ...settings
        })
        .select()
        .single()

      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      console.error('プライバシー設定更新エラー:', error)
      return { 
        success: false, 
        error: error.message || 'プライバシー設定更新に失敗しました' 
      }
    }
  }

  // ユーザーをブロック
  const blockUser = async (blockedUserId: string) => {
    if (!user.value) {
      throw new Error('ユーザーがログインしていません')
    }

    try {
      const { error } = await $supabase
        .from('blocked_users')
        .insert({
          user_id: user.value.id,
          blocked_user_id: blockedUserId
        })

      if (error) throw error

      return { success: true }
    } catch (error: any) {
      console.error('ユーザーブロックエラー:', error)
      return { 
        success: false, 
        error: error.message || 'ユーザーのブロックに失敗しました' 
      }
    }
  }

  // ユーザーのブロック解除
  const unblockUser = async (blockedUserId: string) => {
    if (!user.value) {
      throw new Error('ユーザーがログインしていません')
    }

    try {
      const { error } = await $supabase
        .from('blocked_users')
        .delete()
        .eq('user_id', user.value.id)
        .eq('blocked_user_id', blockedUserId)

      if (error) throw error

      return { success: true }
    } catch (error: any) {
      console.error('ブロック解除エラー:', error)
      return { 
        success: false, 
        error: error.message || 'ブロック解除に失敗しました' 
      }
    }
  }

  // ブロックリスト取得
  const getBlockedUsers = async () => {
    if (!user.value) {
      throw new Error('ユーザーがログインしていません')
    }

    try {
      const { data, error } = await $supabase
        .from('blocked_users')
        .select(`
          *,
          blocked_user:blocked_user_id (
            id,
            user_profiles (
              username,
              display_name,
              avatar_url
            )
          )
        `)
        .eq('user_id', user.value.id)

      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      console.error('ブロックリスト取得エラー:', error)
      return { 
        success: false, 
        error: error.message || 'ブロックリスト取得に失敗しました' 
      }
    }
  }

  // サンプル作品アップロード
  const uploadSampleWork = async (file: File) => {
    if (!user.value) {
      throw new Error('ユーザーがログインしていません')
    }

    try {
      // ファイルサイズチェック（5MB）
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('ファイルサイズは5MB以下にしてください')
      }

      // ファイル名を生成
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.value.id}/${Date.now()}.${fileExt}`
      const filePath = `portfolio/${fileName}`

      // Supabase Storageにアップロード
      const { error: uploadError } = await $supabase.storage
        .from('portfolio')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 公開URLを取得
      const { data: urlData } = $supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath)

      return { 
        success: true, 
        url: urlData.publicUrl 
      }
    } catch (error: any) {
      console.error('サンプル作品アップロードエラー:', error)
      return { 
        success: false, 
        error: error.message || 'サンプル作品アップロードに失敗しました' 
      }
    }
  }

  // アカウント削除
  const deleteAccount = async () => {
    if (!user.value) {
      throw new Error('ユーザーがログインしていません')
    }

    try {
      // Supabaseの場合、ユーザー削除は管理者権限が必要なため、
      // 実際はサーバー側のAPIを呼び出す必要があります
      const { error } = await $fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${(await $supabase.auth.getSession()).data.session?.access_token}`
        }
      })

      if (error) throw error

      // ログアウト
      await $supabase.auth.signOut()

      return { success: true }
    } catch (error: any) {
      console.error('アカウント削除エラー:', error)
      return { 
        success: false, 
        error: error.message || 'アカウント削除に失敗しました' 
      }
    }
  }

  return {
    updateProfile,
    uploadAvatar,
    updateCreatorSettings,
    updateNotificationSettings,
    updatePrivacySettings,
    blockUser,
    unblockUser,
    getBlockedUsers,
    uploadSampleWork,
    deleteAccount
  }
}インしていません')
    }

    try {
      const { data, error } = await $supabase
        .from('user_profiles')
        .update(profileData)
        .eq('user_id', user.value.id)
        .select()
        .single()

      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      console.error('プロフィール更新エラー:', error)
      return { 
        success: false, 
        error: error.message || 'プロフィール更新に失敗しました' 
      }
    }
  }

  // アバター画像アップロード
  const uploadAvatar = async (file: File) => {
    if (!user.value) {
      throw new Error('ユーザーがログインしていません')
    }

    try {
      // ファイルサイズチェック（5MB）
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('ファイルサイズは5MB以下にしてください')
      }

      // ファイルタイプチェック
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        throw new Error('対応している形式はJPEG、PNG、GIF、WebPのみです')
      }

      // ファイル名を生成
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.value.id}-${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Supabase Storageにアップロード
      const { error: uploadError } = await $supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true,
          cacheControl: '3600'
        })

      if (uploadError) throw uploadError

      // 公開URLを取得
      const { data: urlData } = $supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // プロフィールのavatar_urlを更新
      const { error: updateError } = await $supabase
        .from('user_profiles')
        .update({ avatar_url: urlData.publicUrl })
        .eq('user_id', user.value.id)

      if (updateError) throw updateError

      return { 
        success: true, 
        url: urlData.publicUrl 
      }
    } catch (error: any) {
      console.error('アバターアップロードエラー:', error)
      return { 
        success: false, 
        error: error.message || 'アバターアップロードに失敗しました' 
      }
    }
  }

  // クリエイター設定更新
  const updateCreatorSettings = async (settings: {
    commission_status?: string
    specialty?: string
    skills?: string[]
    minimum_price?: number
    maximum_price?: number
    average_delivery_days?: number
    accept_nsfw?: boolean
    accept_commercial?: boolean
    accept_revisions?: boolean
    portfolio_url?: string
    sample_works?: string[]
    bank_account?: any
  }) => {
    if (!user.value) {
      throw new Error('ユーザーがログインしていません')
    }

    try {
      // 既存のプロフィールを確認
      const { data: existing } = await $supabase
        .from('creator_profiles')
        .select('id')
        .eq('user_id', user.value.id)
        .single()

      let result
      
      if (existing) {
        // 更新
        result = await $supabase
          .from('creator_profiles')
          .update(settings)
          .eq('user_id', user.value.id)
          .select()
          .single()
      } else {
        // 新規作成
        result = await $supabase
          .from('creator_profiles')
          .insert({
            user_id: user.value.id,
            ...settings
          })
          .select()
          .single()
      }

      if (result.error) throw result.error

      return { success: true, data: result.data }
    } catch (error: any) {
      console.error('クリエイター設定更新エラー:', error)
      return { 
        success: false, 
        error: error.message || 'クリエイター設定更新に失敗しました' 
      }
    }
  }

  // 通知設定更新
  const updateNotificationSettings = async (settings: {
    email_notifications?: boolean
    push_notifications?: boolean
    new_request_email?: boolean
    request_update_email?: boolean
    promotional_email?: boolean
    weekly_summary_email?: boolean
    browser_notifications?: boolean
  }) => {
    if (!user.value) {
      throw new Error('ユーザーがログインしていません')
    }

    try {
      const { data, error } = await $supabase
        .from('notification_settings')
        .upsert({
          user_id: user.value.id,
          ...settings
        })
        .select()
        .single()

      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      console.error('通知設定更新エラー:', error)
      return { 
        success: false, 
        error: error.message || '通知設定更新に失敗しました' 
      }
    }
  }

  // プライバシー設定更新
  const updatePrivacySettings = async (settings: {
    profile_visible?: boolean
    searchable?: boolean
    show_works?: boolean
    show_followers?: boolean
    show_following?: boolean
    allow_messages?: boolean
  }) => {
    if (!user.value) {
      throw new Error('ユーザーがログ