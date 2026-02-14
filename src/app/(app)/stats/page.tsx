'use client'

import { eachDayOfInterval, format, intervalToDuration, isSameDay, lastDayOfWeek, startOfWeek, Day } from "date-fns"
import { useEffect, useState } from "react"
import { useNotes } from "@/app/hooks/useNotes";
import { useStreaks } from "@/app/hooks/useStreaks";
import { useUserData } from "@/app/hooks/useUserData";
import { redirect } from "next/navigation";
import Quotes from "@/app/components/Quotes";
import WeeklyAiRecap from "@/app/components/WeeklyAiRecap";

export default function Stats() {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const [wordCounter, setWordCounter] = useState<number>()
    const { data: notes } = useNotes()
    const { data: streaks } = useStreaks()
    const { data: user, isLoading } = useUserData()
    const [timer, setTimer] = useState({ days: 0, hours: 0 })

    useEffect(() => { if (!isLoading && !user) { redirect('/welcome') } }, [user, isLoading])

    useEffect(() => {
        //don't remember about shift of the first day of the week
        const dayItem = localStorage.getItem("weekStartOn");
        const weekStartOn = dayItem !== null ? JSON.parse(dayItem) : 0;

        //calculate time from now to the end day of the week
        const now = new Date()
        const lastWeekDay = lastDayOfWeek(now, { weekStartsOn: weekStartOn })
        const duration = intervalToDuration({ start: now, end: lastWeekDay })
        setTimer({ days: duration.days ?? 0, hours: duration.hours ?? 0, })
        console.log(lastWeekDay)
    }, [])

    const getAllDaysInYear = () => {
        const start = new Date(currentYear, 0, 1)
        const end = new Date(currentYear, 11, 31)
        const days = eachDayOfInterval({ start, end })
        return days.map(day => format(day, 'yyyy-MM-dd'))
    }
    // console.log('getAllDaysInYear',getAllDaysInYear())


    const cellStyleMissed = 'bg-neutral-700 w-1 h-1 rounded-full'
    const cellStyleDone = 'bg-red-600 w-1 h-1 rounded-full'

    // const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]



    useEffect(() => {
        const countWords = () => {
            const noteMerged: Array<string> = []
            notes?.map((note) => {
                noteMerged.push(note.decrypted_content)
            })
            const counter = noteMerged.join(' ').trim().split(/\s+/).length
            return setWordCounter(counter)
        }
        countWords()
    }, [notes])



    // console.log('notesText', notesText[0].content)


    // console.log('notesDateArray', notesDateArray)

    return (
        <div className="w-96 mx-auto mt-6">
            {/* <div className='text-neutral-500 font-black text-3xl'>Weekly recap</div> */}

            {/* <div className="text-xl text-neutral-500 text-center font-black mt-4">Stats</div> */}
            <div className="component-bg w-full p-6 overflow-hidden mt-4">
                <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-y-auto scrollbar-hide mt-2">
                    {getAllDaysInYear().map((day) => {
                        const hasNote = notes?.some(note => isSameDay(note.note_date, day));

                        return (
                            <div key={day} className={hasNote ? cellStyleDone : cellStyleMissed} />
                        );
                    })}
                </div>
            </div>
            <div className="grid grid-flow-col grid-rows-2 gap-4 w-full mt-4">
                <div className="component-bg p-6 font-semibold">Entries <p className="text-xl font-black text-white">{notes?.length}</p></div>
                <div className="component-bg p-6 font-semibold">Current Streak <p className="text-xl font-black text-white">{streaks?.current_streak}</p></div>
                <div className="component-bg p-6 font-semibold">Longest Streak <p className="text-xl font-black text-white">{streaks?.max_streak}</p></div>
                <div className="component-bg p-6 font-semibold">Words <p className="text-xl font-black text-white">{wordCounter}</p></div>
            </div>

            {/* <div className="component-bg p-6 mt-2 mb-40 ">
                <div className="flex flex-wrap gap-2">
                    <div className="bg-neutral-700 py-1 px-2 rounded-full w-fit text-neutral-300">entrepreneurship</div>
                    <div className="bg-neutral-700 py-1 px-2 rounded-full w-fit text-neutral-300">emotional turbulence</div>
                    <div className="bg-neutral-700 py-1 px-2 rounded-full w-fit text-neutral-300">self-doubt</div>
                    <div className="bg-neutral-700 py-1 px-2 rounded-full w-fit text-neutral-300">gratitude</div>
                    <div className="bg-neutral-700 py-1 px-2 rounded-full w-fit text-neutral-300">time management</div>
                </div>
            </div> */}

            {timer.hours < 0 ?
                (
                    <WeeklyAiRecap />
                )
                : (
                    <div className='flex flex-col items-center justify-center pt-6'>
                        <div className='flex flex-col w-96 component-bg p-4'>
                            <div className='flex items-center justify-center'><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 20 20"><path fill="#525252" d="m10.595 5.196l.446 1.371a4.135 4.135 0 0 1 1.441-.795c.59-.192 1.111-.3 1.582-.362l-.43-1.323a9.465 9.465 0 0 0-1.58.368a5.25 5.25 0 0 0-1.459.741zm.927 2.855l.446 1.371a4.135 4.135 0 0 1 1.441-.795c.59-.192 1.111-.3 1.582-.362l-.43-1.323a9.465 9.465 0 0 0-1.58.368a5.21 5.21 0 0 0-1.459.741zm.928 2.854l.446 1.371a4.135 4.135 0 0 1 1.441-.795c.59-.192 1.111-.3 1.582-.362l-.43-1.323a9.465 9.465 0 0 0-1.58.368a5.21 5.21 0 0 0-1.459.741zm-7.062 2.172l.43 1.323a8.745 8.745 0 0 1 1.492-.636a4.141 4.141 0 0 1 1.633-.203l-.446-1.371a5.25 5.25 0 0 0-1.615.257a9.406 9.406 0 0 0-1.494.63zM3.533 7.368l.43 1.323a8.825 8.825 0 0 1 1.492-.636a4.141 4.141 0 0 1 1.633-.203L6.643 6.48a5.263 5.263 0 0 0-1.616.258a9.406 9.406 0 0 0-1.494.63zm.927 2.855l.43 1.323a8.745 8.745 0 0 1 1.492-.636a4.141 4.141 0 0 1 1.633-.203L7.57 9.335a5.25 5.25 0 0 0-1.615.257a9.417 9.417 0 0 0-1.495.631zm6.604-8.813a5.26 5.26 0 0 0-3.053 2.559a5.257 5.257 0 0 0-3.973-.275C1.515 4.514.069 6.321.069 6.321l4.095 12.587c.126.387.646.477.878.143c.499-.719 1.46-1.658 3.257-2.242c1.718-.558 2.969.054 3.655.578c.272.208.662.06.762-.268c.252-.827.907-2.04 2.61-2.593c1.799-.585 3.129-.389 3.956-.1c.385.134.75-.242.625-.629L15.819 1.203s-2.232-.612-4.755.207zm-.113 13.846a5.208 5.208 0 0 0-3.141.044c-1.251.406-2.127.949-2.699 1.404L1.866 6.722c.358-.358 1.187-1.042 2.662-1.521c1.389-.451 2.528-.065 3.279.378l3.144 9.677zm6.894-2.689c-.731-.032-1.759.044-3.01.451a5.205 5.205 0 0 0-2.567 1.81L9.124 5.151c.346-.8 1.04-1.782 2.43-2.233c1.474-.479 2.547-.413 3.047-.334l3.244 9.983z" /></svg></div>
                            <div className='mt-4 text-neutral-500 font-semibold text-center'>Review will be cooked after <p className='inline-block text-neutral-300'>{timer.days}&nbsp;days {timer.hours}h</p> </div>
                        </div>
                    </div>
                )

            }

        </div>
    )
}