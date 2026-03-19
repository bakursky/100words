import { NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'

export async function POST() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: 'Server misconfigured: missing Supabase service role key' },
      { status: 500 }
    )
  }

  // Uses the service role key (server-side only) to bypass RLS and delete the Auth user.
  const admin = createAdminClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  // Delete app-owned per-user data first to avoid leaving orphaned rows.
  const { error: notesError } = await admin
    .from('notes')
    .delete()
    .eq('user_id', user.id)

  if (notesError) {
    return NextResponse.json({ error: notesError.message }, { status: 500 })
  }

  const { error: streaksError } = await admin
    .from('streaks')
    .delete()
    .eq('user_id', user.id)

  if (streaksError) {
    return NextResponse.json({ error: streaksError.message }, { status: 500 })
  }

  const { error: deleteUserError } = await admin.auth.admin.deleteUser(user.id)

  if (deleteUserError) {
    return NextResponse.json({ error: deleteUserError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

