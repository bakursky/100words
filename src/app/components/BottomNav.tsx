'use client'

import { useRouter } from "next/navigation"
import { Modal } from '../components/Modal';
import { useState } from "react";
import { Calendar } from "./Calendar";

export function BottomNav() {


  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className=" bottom-4 fixed w-full ">

        <div className="flex gap-2 justify-center items-center text-neutral-600 font-semibold">
          <button onClick={() => { router.push('/notes') }} className="text-neutral-200 bg-neutral-800 p-1 px-4 rounded-full">
            {/* <div>✍</div> */}
            ✍ Today
          </button>


          <button onClick={() => { router.push('/entries') }} className="text-neutral-200 bg-neutral-800 p-1 px-4 rounded-full">
            {/* <div>📃</div> */}
            📃 Entries
          </button>

          <button onClick={() => { router.push('/stats') }} className="text-neutral-200 bg-neutral-800 p-1 px-4 rounded-full">
            {/* <div>🥇</div> */}
            📅 Stats
          </button>

          <button onClick={() => { router.push('/settings') }} className="text-neutral-200 bg-neutral-800 p-1 px-4 rounded-full">
            {/* <div>⚙</div> */}
            ⚙

          </button>
        </div>


      </div>
      {/* <Modal isOpen={modalOpen} onClose={() => { setModalOpen(!modalOpen) }}>
        <Calendar events={[3, 6, 8, 2]} />
      </Modal> */}
    </>
  )
}