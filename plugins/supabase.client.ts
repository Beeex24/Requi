import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: {
          getItem: (key) => {
            if (process.client) {
              return localStorage.getItem(key)
            }
            return null
          },
          setItem: (key, value) => {
            if (process.client) {
              localStorage.setItem(key, value)
            }
          },
          removeItem: (key) => {
            if (process.client) {
              localStorage.removeItem(key)
            }
          },
        },
      },
    }
  )

  return {
    provide: {
      supabase
    }
  }
})