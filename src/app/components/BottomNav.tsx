'use client'

import { useRouter } from "next/navigation"

export function BottomNav() {


  const router = useRouter()

  return (
    <>
      <div className=" bottom-4 fixed w-full ">

        <div className="flex gap-2 justify-center items-center text-neutral-600 font-semibold">
          <button onClick={() => { router.push('/notes') }} className="text-neutral-200 bg-neutral-800 p-1 px-4 rounded-full">
            ✍ Today
          </button>


          <button onClick={() => { router.push('/entries') }} className="text-neutral-200 bg-neutral-800 p-1 px-4 rounded-full">
            📃 Entries
          </button>

          <button onClick={() => { router.push('/stats') }} className="text-neutral-200 bg-neutral-800 p-1 px-4 rounded-full">
            📅 Stats
          </button>

          <button onClick={() => { router.push('/settings') }} className="text-neutral-200 bg-neutral-800 p-1 px-4 rounded-full">
            ⚙

          </button>
        </div>


      </div>

    </>
  )
}