'use client'

import { useRouter } from "next/navigation"
import RedButton from "./RedButton"
import { useNote } from "../context/NoteContex"

export function BottomNav() {
  const router = useRouter()
  const {note, wordCount} = useNote()

  return (
    <div className="flex justify-center font-inria">
      <div className="flex items-center gap-4 p-4 px-4 h-[50px] bottom-8 fixed rounded-full component-bg text-white/35 z-30">

        <div className="flex gap-4">

          <button onClick={() => { router.push('/notes') }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20"><path fill="currentColor" d="M4.254 19.567c.307-.982.77-2.364 1.391-4.362c2.707-.429 3.827.341 5.546-2.729c-1.395.427-3.077-.792-2.987-1.321c.091-.528 3.913.381 6.416-3.173c-3.155.696-4.164-.836-3.757-1.067c.939-.534 3.726-.222 5.212-1.669c.766-.745 1.125-2.556.813-3.202c-.374-.781-2.656-1.946-3.914-1.836c-1.258.109-3.231 4.79-3.817 4.754c-.584-.037-.703-2.098.319-4.013c-1.077.477-3.051 1.959-3.67 3.226c-1.153 2.357.108 7.766-.296 7.958c-.405.193-1.766-2.481-2.172-3.694c-.555 1.859-.568 3.721 1.053 6.194c-.611 1.623-.945 3.491-.996 4.441c-.024.759.724.922.859.493z" /></svg>
          </button>


          <button onClick={() => { router.push('/entries') }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20"><path fill="currentColor" d="M18.405 4.799c-.111-.44-.655-.799-1.21-.799h-6.814c-.554 0-1.33-.318-1.722-.707l-.596-.588C7.671 2.316 6.896 2 6.342 2H3.087c-.555 0-1.059.447-1.12.994L1.675 6h16.931l-.201-1.201zM19.412 7H.588a.58.58 0 0 0-.577.635l.923 9.669A.77.77 0 0 0 1.7 18h16.6a.77.77 0 0 0 .766-.696l.923-9.669A.58.58 0 0 0 19.412 7z" /></svg>
          </button>

        </div>

        <div className="flex w-[65px] h-[65px] red-button rounded-full items-center justify-center">
          <p className="text-xl font-bold text-white/70">
          <RedButton wordCount={wordCount} note={note}></RedButton>
          </p>
        </div>



        <div className="flex gap-4">

          <button onClick={() => { router.push('/stats') }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20"><path fill="currentColor" d="M11 .958v9.039C11 10.551 10.551 11 9.997 11H.958A9.1 9.1 0 1 0 11 .958zm-2 0A9.098 9.098 0 0 0 .958 9H9V.958z" /></svg>
          </button>

          <button onClick={() => { router.push('/settings') }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20"><path fill="currentColor" d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm0-2.6A2.2 2.2 0 1 0 9.999.8a2.2 2.2 0 0 0 .002 4.4zm0 9.6a2.2 2.2 0 1 0 0 4.402a2.2 2.2 0 0 0 0-4.402z" /></svg>
          </button>

        </div>



      </div>

    </div>
  )
}