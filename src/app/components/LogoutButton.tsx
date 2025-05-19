'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (!error) {
      router.push('/login')
    }
  }

  return (
    <>
    <button onClick={handleLogout} className='mt-4 text-red-600 bg-neutral-800 w-full rounded-2xl p-4'>
      Logout
    </button>
    </>
  )
}