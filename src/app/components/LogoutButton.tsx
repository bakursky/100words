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
    <button onClick={handleLogout} className='px-4 py-2 mt-2 component-bg border-[1.5px] border-neutral-800'>
      Sign Out
    </button>
    </>
  )
}