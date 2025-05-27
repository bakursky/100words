'use client'

import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
    const supabase = createClient()


    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
            }
        })

        if (error) {
            console.error('Google OAuth Error:', error)
        }
    }

    return (
        <>
            <button onClick={handleGoogleLogin} className='pt-40'>Sign in with Google</button>
        </>
    )
}