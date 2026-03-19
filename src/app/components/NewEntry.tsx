'use client'

import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { useTextAreaStore } from "../store/textAreaStore";
import RedButton from "./RedButton";
import { useNewEntryStore } from "../store/newEntryStore";
import { useModalStore } from "../store/modalStore";
import { useTodaysNoteStore } from "../store/todaysNoteStore";

export default function NewEntry() {
    // const [modalOpen, setModalOpen] = useState(false)
    const { modalOpen, setModalOpen } = useModalStore()
    const [exitModalOpen, setExitModalOpen] = useState(false)
    const { value, setValue } = useTextAreaStore()
    const [spellCheck, setSpellCheck] = useState(true)
    const { newEntryOpen, setNewEntryOpen } = useNewEntryStore()
    const { todaysNote } = useTodaysNoteStore()



    useEffect(() => {
        const stored = localStorage.getItem("spellCheck");
        if (stored !== null) setSpellCheck(JSON.parse(stored));
    }, []);

    if (!newEntryOpen) return null;

    const wordCounter = () => {
        const words = value.trim().split(/\s+/).filter(word => word.replace(/[^\p{L}\p{N}]/gu, '').length > 0)
        if (value === '') { return 0 }
        else { return words.length }
    }

    return (
        <>
            <div className="bg-[#0f0e0e] fixed inset-0 z-40 flex flex-col items-center mx-auto">

                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                >
                    <div className="w-80 px-4">
                    <div className="p-4 text-neutral-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 20 20"><path fill="currentColor" d="M4.254 19.567c.307-.982.77-2.364 1.391-4.362c2.707-.429 3.827.341 5.546-2.729c-1.395.427-3.077-.792-2.987-1.321c.091-.528 3.913.381 6.416-3.173c-3.155.696-4.164-.836-3.757-1.067c.939-.534 3.726-.222 5.212-1.669c.766-.745 1.125-2.556.813-3.202c-.374-.781-2.656-1.946-3.914-1.836c-1.258.109-3.231 4.79-3.817 4.754c-.584-.037-.703-2.098.319-4.013c-1.077.477-3.051 1.959-3.67 3.226c-1.153 2.357.108 7.766-.296 7.958c-.405.193-1.766-2.481-2.172-3.694c-.555 1.859-.568 3.721 1.053 6.194c-.611 1.623-.945 3.491-.996 4.441c-.024.759.724.922.859.493z" /></svg>
                    </div>
                        <p className="font-semibold">Just Write!</p>
                        <p className="text-neutral-400">Use the free writing technique: write without stopping, editing, or worrying about grammar. Let your thoughts flow naturally.</p>
                        <p className="font-semibold mt-4">Hit 100 Words</p>
                        <p className="text-neutral-400">Keep writing until you reach 100 words. You can check word counter at the bottom. The pen icon on the right will light up when you reach the goal.</p>
                        <p className="font-semibold mt-4">Save & Close</p>
                        <p className="text-neutral-400">Tap the glowing pen icon to save your entry and finish for the day.</p>

                    </div>
                    <div className="flex gap-2 justify-center">
                        <button onClick={() => setModalOpen(false)} className="text-white/80 bg-neutral-700 p-2 rounded-full mt-2">Close</button>
                    </div>
                </Modal>

                <Modal
                    isOpen={exitModalOpen}
                    onClose={() => setExitModalOpen(false)}
                >
                    <p className="text-neutral-300 w-64 text-center">Write at least 100 words to save your daily note! </p>
                    <div className="flex gap-2 justify-center">
                        <button onClick={() => setExitModalOpen(false)} className="text-white/80 bg-neutral-700 font-semibold shadow-lg p-2 rounded-full mt-2">Return</button>
                        <button onClick={() => { setNewEntryOpen(false); setExitModalOpen(false); setValue(todaysNote) }} className="text-neutral-800 font-semibold shadow-lg bg-neutral-300 p-2 px-4 rounded-full mt-2">Exit</button>
                    </div>
                </Modal>

                <textarea
                    autoFocus
                    className="bg-transparent w-full px-8 lg:px-96 flex-1 py-14 resize-none outline-none text-2xl/10 caret-neutral-400 text-neutral-400 placeholder:text-neutral-600 selection:bg-neutral-700/50 scrollbar-hide"
                    placeholder="Start writing..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    spellCheck={spellCheck}
                />

                <button onClick={() => value === todaysNote ? setNewEntryOpen(false) : setExitModalOpen(true)} className='fixed top-5 right-5'>
                    <div className="w-8 h-8 component-bg flex items-center justify-center hover:scale-90  transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20"><path fill="#a3a3a3" d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15l-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152l2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </div>
                </button>

                <div className='fixed bottom-0 right-5'>
                    <RedButton />
                </div>

                <div className="fixed bottom-0 flex flex-row gap-2 mb-4">
                    <div className="text-md font-semibold text-neutral-600 component-bg py-1 px-4 cursor-default">{wordCounter()} words</div>
                    <button onClick={() => setModalOpen(true)} className="text-md font-semibold text-neutral-600 component-bg py-1 px-4">?</button>
                </div>

                {/* <div className="w-full h-2">
                        <div
                            className="bg-neutral-400 h-2 transition-all duration-300"
                            style={{ width: `${Math.min((wordCounter() / 100) * 100, 100)}%` }}
                        ></div>
                    </div> */}
            </div >
        </>
    )
}