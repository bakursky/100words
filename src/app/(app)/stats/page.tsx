'use client'

import { eachDayOfInterval, format, isSameDay } from "date-fns"
import { useEffect, useState } from "react"
import { useNotes } from "@/app/hooks/useNotes";
import { useStreaks } from "@/app/hooks/useStreaks";
import { useUserData } from "@/app/hooks/useUserData";
import { redirect } from "next/navigation";

export default function Stats() {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const [wordCounter, setWordCounter] = useState<number>();
    const { data: notes } = useNotes();
    const { data: streaks } = useStreaks();
    const { data: user, isLoading } = useUserData()

    useEffect(()=>{if (!isLoading && !user){redirect('/welcome')}}, [user, isLoading])


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
            notes?.map((note)=>{
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
        <div className="max-w-md mx-auto">


            {/* Year Progress */}
            <div className="component-bg w-full p-6 overflow-hidden">
                Year progress

                {/* <div className="flex gap-3 text-xs ml-2 mb-2 ">
                    {months.map((item) => {
                        return <div key={item}>{item}</div>
                    })}
                </div> */}

                <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-y-auto scrollbar-hide mt-2">
                    {getAllDaysInYear().map((day) => {
                        const hasNote = notes?.some(note => isSameDay(note.note_date, day));

                        return (
                            <div key={day} className={hasNote ? cellStyleDone : cellStyleMissed} />
                        );
                    })}
                </div>
            </div>

            {/* Other stats */}
            <div className="grid grid-flow-col grid-rows-2 gap-4 w-full mt-4">
                <div className="component-bg p-6">Entries <p className="text-xl font-bold text-white">{notes?.length}</p></div>
                <div className="component-bg p-6">Current Streak <p className="text-xl font-bold text-white">{streaks?.current_streak}</p></div>
                <div className="component-bg p-6">Longest Streak <p className="text-xl font-bold text-white">{streaks?.max_streak}</p></div>
                <div className="component-bg p-6">Words <p className="text-xl font-bold text-white">{wordCounter}</p></div>
            </div>


        </div>
    )
}