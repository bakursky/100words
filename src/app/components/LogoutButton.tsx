'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (!error) {
      router.push('/welcome')
    }
  }

  return (
    <>
    <button onClick={handleLogout} className='mt-4 text-red-600 w-full rounded-2xl p-4 component-bg'>
      Logout
    </button>
    </>
  )
}