'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()


    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
            }
        })

        if (error) {
            setError(error.message)
            console.error('Google OAuth Error:', error)
        }
    }

    return (
        <>
            <button onClick={handleGoogleLogin} className='pt-40'>Sign in with Google</button>
        </>
    )
}