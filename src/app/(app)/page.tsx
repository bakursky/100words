// pages/notes.tsx
'use client'

import { useEffect, useState } from 'react';
import { endOfDay, intervalToDuration } from 'date-fns';
import { useNotes } from "../hooks/useNotes";
import { useUserData } from '../hooks/useUserData';
import { redirect } from 'next/navigation';
import Streaks from '../components/Streaks';
import { useStreaks } from '../hooks/useStreaks';
import Quotes from '../components/Quotes';
import { useNewEntryStore } from '../store/newEntryStore';
import { useTodaysNoteStore } from '../store/todaysNoteStore';

export default function Home() {
    const { data: notes, isLoading: notesLoading, isPending: notesPending } = useNotes()
    const [timer, setTimer] = useState({ hours: 0, minutes: 0 })
    // const { value, setValue } = useTextAreaStore()
    // const [todaysNote, setTodaysNote] = useState('')

    const isLoadingNotes = notesLoading || notesPending;
    const { data: user, isLoading } = useUserData()
    const { data: streaks } = useStreaks();
    const { setNewEntryOpen } = useNewEntryStore()

    const { todaysNote, filterAndSetTodaysNote } = useTodaysNoteStore()

    useEffect(() => { if (!isLoading && !user) { redirect('/welcome') } }, [user, isLoading])

    useEffect(() => {
        const now = new Date()
        const endOfToday = endOfDay(now)
        const duration = intervalToDuration({ start: now, end: endOfToday })

        setTimer({ hours: duration.hours ?? 0, minutes: duration.minutes ?? 0 })
    }, [])

    useEffect(() => {
        filterAndSetTodaysNote(notes);
    }, [notes, filterAndSetTodaysNote]);


    // useEffect(() => {
    //     const filterTodayNote = async () => {
    //         const now = new Date()
    //         const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0]
    //         if (notes && notes.length > 0) {
    //             const todaysNote = (notes.find(note => note.note_date === today))
    //             // console.log(todaysNote?.decrypted_content)
    //             if (todaysNote) {
    //                 setTodaysNote(todaysNote.decrypted_content)
    //                 setValue(todaysNote.decrypted_content)
    //             }
    //         }


    //     }

    //     filterTodayNote();
    // }, [notes, setValue]);

console.log('todaysNote2', notes)

    return (

        <div className="flex flex-col w-96 items-center mx-auto gap-4 mt-6 mb-20"
        // style={{ height: 'calc(100vh - 160px)' }}
        >
            <Streaks />

            <div className="flex gap-4 w-full text-neutral-600 font-semibold">
                <div className="component-bg p-6 w-full flex flex-col">
                    <div className='flex gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M6.803 18.998c-.194-.127 3.153-7.16 3.038-7.469c-.116-.309-3.665-1.436-3.838-1.979c-.174-.543 7.007-8.707 7.196-8.549c.188.158-3.129 7.238-3.039 7.469c.091.23 3.728 1.404 3.838 1.979c.111.575-7.002 8.676-7.195 8.549z" /></svg>
                        Current streak</div>
                    <p className="text-xl font-bold text-red-700 w-full">{streaks?.current_streak}&nbsp;days</p>
                </div>

                <div className="component-bg p-6 w-full flex flex-col">
                    <div className='flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M8.127 13.6c-.689 1.197-.225 2.18.732 2.732c.956.553 2.041.465 2.732-.732c.689-1.195 5.047-11.865 4.668-12.084c-.379-.219-7.442 8.888-8.132 10.084zM10 6c.438 0 .864.037 1.281.109c.438-.549.928-1.154 1.405-1.728A9.664 9.664 0 0 0 10 4C4.393 4 0 8.729 0 14.766c0 .371.016.742.049 1.103c.049.551.54.955 1.084.908c.551-.051.957-.535.908-1.086A10.462 10.462 0 0 1 2 14.766C2 9.85 5.514 6 10 6zm7.219 1.25c-.279.75-.574 1.514-.834 2.174C17.4 10.894 18 12.738 18 14.766c0 .316-.015.635-.043.943a1.001 1.001 0 0 0 1.992.182c.033-.37.051-.748.051-1.125c0-2.954-1.053-5.59-2.781-7.516z" /></svg>
                        Max streak</div>
                    <p className="text-xl font-bold text-red-700 w-full">{streaks?.max_streak}&nbsp;days</p>
                </div>


                {/* <div className="component-bg p-6 w-full">Longest Streak <p className="text-xl font-bold text-white">{streaks?.max_streak}</p></div> */}
            </div>

            {isLoadingNotes ? (
                <div className='flex-col w-96 component-bg p-6'>
                    <div className='text-neutral-600 font-semibold'></div>
                    {/* Optional: Add a skeleton or spinner here */}
                </div>
            ) : todaysNote.trim().length > 0 ? (
                <div className='flex-col w-96 component-bg p-6'>
                    <div className='text-neutral-600 font-semibold'>Today&apos;s note</div>
                    <p className='text-neutral-400'>{todaysNote}</p>
                    <button className='w-full mt-4 bg-neutral-700 rounded-full p-2 font-semibold text-white/70' onClick={() => setNewEntryOpen(true)}>Edit</button>
                </div>
            ) : (
                <div className=''>
                    <button className='flex-col w-96 component-bg p-4' onClick={() => setNewEntryOpen(true)}>
                        <div className='flex items-center justify-center'><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 20 20"><path fill="#525252" d="M4.254 19.567c.307-.982.77-2.364 1.391-4.362c2.707-.429 3.827.341 5.546-2.729c-1.395.427-3.077-.792-2.987-1.321c.091-.528 3.913.381 6.416-3.173c-3.155.696-4.164-.836-3.757-1.067c.939-.534 3.726-.222 5.212-1.669c.766-.745 1.125-2.556.813-3.202c-.374-.781-2.656-1.946-3.914-1.836c-1.258.109-3.231 4.79-3.817 4.754c-.584-.037-.703-2.098.319-4.013c-1.077.477-3.051 1.959-3.67 3.226c-1.153 2.357.108 7.766-.296 7.958c-.405.193-1.766-2.481-2.172-3.694c-.555 1.859-.568 3.721 1.053 6.194c-.611 1.623-.945 3.491-.996 4.441c-.024.759.724.922.859.493z" /></svg></div>
                        <div className='mt-4 text-neutral-600 font-semibold text-center'>You have <p className='inline-block text-red-700'>{timer.hours}h {timer.minutes}min</p> to close the day</div>
                        <div className='mt-4 bg-red-800 rounded-full p-2 font-semibold text-white/70'>Write 100 words</div>
                    </button>
                </div>
            )}

            <Quotes />


            {/* <button onClick={() => setIsWritingMode(true)}>Open text area</button> */}

            {/* <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                // required
                spellCheck={spellCheck}
                autoFocus
                className='bg-transparent w-96 mx-auto h-full caret-red-600 text-neutral-200 selection:bg-neutral-700/50 text-xl  outline-none resize-none scrollbar-hide'
            /> */}

        </div>

    );
}
