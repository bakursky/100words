'use client'

import { createClient } from "@/utils/supabase/client"

export default function Welcome() {
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
    <div className="flex flex-col items-center justify-center cursor-custom">

      <div className="w-96 text-center px-4">

        <div className="py-6 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 20 20"><path fill="#b91c1c" d="M4.254 19.567c.307-.982.77-2.364 1.391-4.362c2.707-.429 3.827.341 5.546-2.729c-1.395.427-3.077-.792-2.987-1.321c.091-.528 3.913.381 6.416-3.173c-3.155.696-4.164-.836-3.757-1.067c.939-.534 3.726-.222 5.212-1.669c.766-.745 1.125-2.556.813-3.202c-.374-.781-2.656-1.946-3.914-1.836c-1.258.109-3.231 4.79-3.817 4.754c-.584-.037-.703-2.098.319-4.013c-1.077.477-3.051 1.959-3.67 3.226c-1.153 2.357.108 7.766-.296 7.958c-.405.193-1.766-2.481-2.172-3.694c-.555 1.859-.568 3.721 1.053 6.194c-.611 1.623-.945 3.491-.996 4.441c-.024.759.724.922.859.493z" /></svg>
        </div>

        <div className="flex justify-center">
          <div className="component-bg text-sm p-2 w-40">100 words.app <em className="text-neutral-400">beta</em></div>
        </div>



        <h1 className="text-4xl font-extrabold pt-2">Learn the <span className="text-red-700">#1</span> habit for mental health.</h1>
        <p className="py-4 text-neutral-200 text-base">
          <span className="font-bold">100 Words app</span> makes building a daily journaling habit effortless. Just write 100 words a day—unlock clarity, creativity, and consistency.
        </p>

        
          <button onClick={handleGoogleLogin} className='flex flex-row w-full text-black bg-neutral-200 items-center justify-center gap-2 p-4 rounded-full hover:scale-95 transition-all'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
            </div>
            Continue with Google</button>
        

        <div className="component-bg text-left text-sm p-6 my-8 flex flex-col gap-4">

          <div className="flex flex-row gap-4">
            <div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#b91c1c" d="M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.392 1.392 0 0 1 .27-1.951a1.392 1.392 0 0 1 1.953.27l2.351 3.104l5.911-9.492a1.396 1.396 0 0 1 1.921-.445c.653.406.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656c-.022.002-.042.002-.064.002z" /></svg></div>
            <div>Core features are free to use. Always.</div>
          </div>

          <div className="flex flex-row gap-4">
            <div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#b91c1c" d="M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.392 1.392 0 0 1 .27-1.951a1.392 1.392 0 0 1 1.953.27l2.351 3.104l5.911-9.492a1.396 1.396 0 0 1 1.921-.445c.653.406.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656c-.022.002-.042.002-.064.002z" /></svg></div>
            <div>Works everywhere—install without app stores. Sign in with Google.</div>
          </div>

          <div className="flex flex-row gap-4">
            <div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#b91c1c" d="M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.392 1.392 0 0 1 .27-1.951a1.392 1.392 0 0 1 1.953.27l2.351 3.104l5.911-9.492a1.396 1.396 0 0 1 1.921-.445c.653.406.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656c-.022.002-.042.002-.064.002z" /></svg></div>
            <div>Zen-oriented: No unnecessary text formatting, no distracting prompts, no AI while writing.</div>
          </div>

          <div className="flex flex-row gap-4">
            <div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#b91c1c" d="M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.392 1.392 0 0 1 .27-1.951a1.392 1.392 0 0 1 1.953.27l2.351 3.104l5.911-9.492a1.396 1.396 0 0 1 1.921-.445c.653.406.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656c-.022.002-.042.002-.064.002z" /></svg></div>
            <div>Fully private with backend encryption.</div>
          </div>

          <div className="flex flex-row gap-4">
            <div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#b91c1c" d="M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.392 1.392 0 0 1 .27-1.951a1.392 1.392 0 0 1 1.953.27l2.351 3.104l5.911-9.492a1.396 1.396 0 0 1 1.921-.445c.653.406.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656c-.022.002-.042.002-.064.002z" /></svg></div>
            <div>Gamification-based. Designed constraints make journaling fun.</div>
          </div>

        </div>

      </div>

    </div>
  )
}

