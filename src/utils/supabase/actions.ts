'use server'

import { createSupabaseServerClient } from '@/utils/supabase/server-client'

export async function signOut() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
}