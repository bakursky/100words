'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function DeleteAccount() {
  const supabase = createClient()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    if (isDeleting) return

    const confirmed = window.confirm(
      'This will permanently delete your account and all your notes/streaks. Continue?'
    )
    if (!confirmed) return

    setIsDeleting(true)
    try {
      const res = await fetch('/api/account/delete', { method: 'POST' })
      if (!res.ok) {
        const payload = await res.json().catch(() => null)
        throw new Error(payload?.error ?? 'Failed to delete account')
      }

      // Clear local auth session/cookies if they're still present.
      await supabase.auth.signOut().catch(() => {})

      router.push('/welcome')
    } catch (err) {
      console.error('Delete account failed:', err)
      window.alert(err instanceof Error ? err.message : 'Delete account failed')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleDeleteAccount}
        disabled={isDeleting}
        className="w-full component-bg mt-4 rounded-2xl p-4 text-red-900 disabled:opacity-60"
      >
        {isDeleting ? 'Deleting...' : 'Delete account'}
      </button>
    </>
  )
}