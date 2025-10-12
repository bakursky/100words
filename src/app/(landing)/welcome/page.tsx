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

        <div className="flex justify-center pt-4 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#FFDC00" d="m10 1.3l2.388 6.722H18.8l-5.232 3.948l1.871 6.928L10 14.744l-5.438 4.154l1.87-6.928l-5.233-3.948h6.412L10 1.3z" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#FFDC00" d="m10 1.3l2.388 6.722H18.8l-5.232 3.948l1.871 6.928L10 14.744l-5.438 4.154l1.87-6.928l-5.233-3.948h6.412L10 1.3z" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#FFDC00" d="m10 1.3l2.388 6.722H18.8l-5.232 3.948l1.871 6.928L10 14.744l-5.438 4.154l1.87-6.928l-5.233-3.948h6.412L10 1.3z" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#FFDC00" d="m10 1.3l2.388 6.722H18.8l-5.232 3.948l1.871 6.928L10 14.744l-5.438 4.154l1.87-6.928l-5.233-3.948h6.412L10 1.3z" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#FFDC00" d="m10 1.3l2.388 6.722H18.8l-5.232 3.948l1.871 6.928L10 14.744l-5.438 4.154l1.87-6.928l-5.233-3.948h6.412L10 1.3z" /></svg>
        </div>


        <h1 className="text-4xl font-extrabold pt-2">Learn the <span className="text-red-700">#1</span> habit for mental health.</h1>
        <p className="py-4 text-neutral-200 text-base">
          <span className="font-bold">100 Words app</span> makes building a daily journaling habit effortless. Just write 100 words a day—unlock clarity, creativity, and consistency.
        </p>

        <button onClick={handleGoogleLogin} className='bg-red-700 p-4 rounded-full shadow-red-900 shadow-xl hover:shadow-lg hover:shadow-red-900 hover:scale-90 transition-all'>Start journaling for free</button>

        <div className="component-bg text-left text-sm p-6 mt-8 flex flex-col gap-4">

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

        <div className="py-8 text-sm text-neutral-400">Build with ♥ by journalist for journalists</div>

      </div>

    </div>
  )
}

