import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { LogoutButton } from '../components/LogoutButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // Then, verify the user with getUser()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>

    <LogoutButton/>
    </div>
  )
}