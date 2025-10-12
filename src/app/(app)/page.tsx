// pages/notes.tsx
'use client'

import { useEffect, useState } from 'react';
import { endOfDay, intervalToDuration } from 'date-fns';
import { useNotes } from "../hooks/useNotes";
import { useTextAreaStore } from '../store/textAreaStore';
import { Modal } from '../components/Modal';
import { useModalStore } from '../store/modalStore';
import { useUserData } from '../hooks/useUserData';
import { redirect } from 'next/navigation';

export default function Home() {
    const { data: notes } = useNotes()
    const [timer, setTimer] = useState({ hours: 0, minutes: 0 })
    const [spellCheck, setSpellCheck] = useState(true);
    const { value, setValue } = useTextAreaStore()
    const { modalOpen, setModalOpen } = useModalStore()
    const { data: user, isLoading } = useUserData()

    useEffect(()=>{if (!isLoading && !user){redirect('/welcome')}}, [user, isLoading])

    useEffect(() => {
        const stored = localStorage.getItem("spellCheck");
        if (stored !== null) setSpellCheck(JSON.parse(stored));
    }, []);


    useEffect(() => {
        const now = new Date()
        const endOfToday = endOfDay(now)
        const duration = intervalToDuration({ start: now, end: endOfToday })

        setTimer({ hours: duration.hours ?? 0, minutes: duration.minutes ?? 0 })
    }, [])

    useEffect(() => {
        const filterTodayNote = async () => {
            const now = new Date()
            const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0]
            if (notes && notes.length > 0) {
                const todaysNote = (notes.find(note => note.note_date === today))
                // console.log(todaysNote?.decrypted_content)
                if (todaysNote) {
                    setValue(todaysNote.decrypted_content)
                }
            }


        }

        filterTodayNote();
    }, [notes, setValue]);



    const placeholderVisibility = () => {
        const baseClasses = 'absolute inset-0 flex items-center justify-center -z-10'
        const hiddenClass = ' hidden'
        return value.length > 0 ? hiddenClass : baseClasses
    }


    return (

        <div className="flex w-full overflow-hidden "
            style={{ height: 'calc(100vh - 160px)' }}
        >
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <p>The day is closed! See you tomorrow, Legend!</p>
                <div className="flex gap-2 justify-center">
                    <button onClick={() => setModalOpen(false)} className="text-white/80 bg-neutral-700 p-2 rounded-full mt-2">Close</button>
                </div>
            </Modal>

            <div className={placeholderVisibility()}>
                <div className='flex-col'>
                    <div className='flex items-center justify-center'><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 20 20"><path fill="#525252" d="M4.254 19.567c.307-.982.77-2.364 1.391-4.362c2.707-.429 3.827.341 5.546-2.729c-1.395.427-3.077-.792-2.987-1.321c.091-.528 3.913.381 6.416-3.173c-3.155.696-4.164-.836-3.757-1.067c.939-.534 3.726-.222 5.212-1.669c.766-.745 1.125-2.556.813-3.202c-.374-.781-2.656-1.946-3.914-1.836c-1.258.109-3.231 4.79-3.817 4.754c-.584-.037-.703-2.098.319-4.013c-1.077.477-3.051 1.959-3.67 3.226c-1.153 2.357.108 7.766-.296 7.958c-.405.193-1.766-2.481-2.172-3.694c-.555 1.859-.568 3.721 1.053 6.194c-.611 1.623-.945 3.491-.996 4.441c-.024.759.724.922.859.493z" /></svg></div>
                    <div className='mt-4 text-neutral-600 font-semibold w-48 text-center'>You have <p className='inline-block text-red-700'>{timer.hours}h {timer.minutes}min</p> to write 100 words</div>
                </div>
            </div>


            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                // required
                spellCheck={spellCheck}
                autoFocus
                className='bg-transparent w-96 mx-auto h-full caret-red-600 text-neutral-200 selection:bg-neutral-700/50 text-xl  outline-none resize-none scrollbar-hide'
            />

        </div>

    );
}
