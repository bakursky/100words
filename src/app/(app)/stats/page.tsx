'use client'

import { eachDayOfInterval, format, intervalToDuration, isSameDay, lastDayOfWeek, startOfWeek, Day } from "date-fns"
import { useEffect, useState } from "react"
import { useNotes } from "@/app/hooks/useNotes";
import { useStreaks } from "@/app/hooks/useStreaks";
import { useUserData } from "@/app/hooks/useUserData";
import { redirect } from "next/navigation";
import WeeklyAiRecap from "@/app/components/WeeklyAiRecap";
import Graph from "@/app/components/Graph";

export default function Stats() {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const [wordCounter, setWordCounter] = useState<number>()
    const { data: notes } = useNotes()
    const { data: streaks } = useStreaks()
    const { data: user, isLoading } = useUserData()


    useEffect(() => { if (!isLoading && !user) { redirect('/welcome') } }, [user, isLoading])



    const getAllDaysInYear = () => {
        const start = new Date(currentYear, 0, 1)
        const end = new Date(currentYear, 11, 31)
        const days = eachDayOfInterval({ start, end })
        return days.map(day => format(day, 'yyyy-MM-dd'))
    }
    // console.log('getAllDaysInYear',getAllDaysInYear())


    const cellStyleMissed = 'bg-neutral-700 w-1 h-1 rounded-full'
    const cellStyleDone = 'bg-neutral-300 w-1 h-1 rounded-full'

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


                    <Graph />
            {/* <div className="component-bg p-6 mt-2 mb-40 ">
                <div className="flex flex-wrap gap-2">
                    <div className="bg-neutral-700 py-1 px-2 rounded-full w-fit text-neutral-300">entrepreneurship</div>
                    <div className="bg-neutral-700 py-1 px-2 rounded-full w-fit text-neutral-300">emotional turbulence</div>
                    <div className="bg-neutral-700 py-1 px-2 rounded-full w-fit text-neutral-300">self-doubt</div>
                    <div className="bg-neutral-700 py-1 px-2 rounded-full w-fit text-neutral-300">gratitude</div>
                    <div className="bg-neutral-700 py-1 px-2 rounded-full w-fit text-neutral-300">time management</div>
                </div>
            </div> */}



        </div>
    )
}