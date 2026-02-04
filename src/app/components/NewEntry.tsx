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
    const {modalOpen, setModalOpen} = useModalStore()
    const [ exitModalOpen, setExitModalOpen ] = useState(false) 
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
            <div className="bg-neutral-900 fixed inset-0 z-40 flex flex-col w-full">

                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                >
                    <p>The day is closed! See you tomorrow, Legend!</p>
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
                        <button onClick={() => {setNewEntryOpen(false); setExitModalOpen(false); setValue(todaysNote)}} className="text-neutral-800 font-semibold shadow-lg bg-neutral-300 p-2 px-4 rounded-full mt-2">Exit</button>
                    </div>
                </Modal>

                <textarea
                    autoFocus
                    className="bg-neutral-900 flex-1 p-14 resize-none outline-none text-2xl caret-purple-600 text-neutral-400 placeholder:text-neutral-600 selection:bg-neutral-700/50 scrollbar-hide"
                    placeholder="Start writing..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    spellCheck={spellCheck}
                />

                <button onClick={() => value === todaysNote ? setNewEntryOpen(false) : setExitModalOpen(true)} className='fixed top-5 right-5'>
                    <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center hover:scale-90  transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20"><path fill="#a3a3a3" d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15l-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152l2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </div>
                </button>

                <div className='fixed bottom-0 right-5'>
                    <RedButton />
                </div>

                <div className="w-full h-2">
                    <div
                        className="bg-purple-700 h-2 transition-all duration-300"
                        style={{ width: `${Math.min((wordCounter() / 100) * 100, 100)}%` }}
                    ></div>
                </div>
            </div >
        </>
    )
}