'use client'

import { createClient } from "@/utils/supabase/client"
import { eachDayOfInterval, format, isSameDay } from "date-fns"
import { useEffect, useState } from "react"

export default function Stats() {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const [notesDateArray, setNotesDateArray] = useState<Array<{ note_date: string }>>([]);
    const [currentStreak, setCurrentStreak] = useState<number>()
    const [maxStreak, setMaxStreak] = useState<number>()
    const [notesText, setNotesText] = useState<number>();



    const getAllDaysInYear = () => {
        const start = new Date(currentYear, 0, 1)
        const end = new Date(currentYear, 11, 31)
        const days = eachDayOfInterval({ start, end })
        return days.map(day => format(day, 'yyyy-MM-dd'))
    }
    // console.log('getAllDaysInYear',getAllDaysInYear())


    const cellStyleMissed = 'bg-neutral-700 w-1 h-1 rounded-full'
    const cellStyleDone = 'bg-red-600 w-1 h-1 rounded-full'

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

 //fetch all notes' dates
    useEffect(() => {
        const getNotesDate = async () => {
            const supabase = createClient()
            const user = await supabase.auth.getUser()
            const userId = user?.data?.user?.id

            const { data, error } = await supabase
                .from('notes')
                .select('note_date')
                .eq('user_id', userId);

            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setNotesDateArray(data)
            }
        }
        getNotesDate()
   
    }, [])

//fetch streaks data
useEffect(() => {
    const fetchStreaks = async () => {
        const supabase = createClient()
        const user = await supabase.auth.getUser()
        const userId = user?.data?.user?.id

        const { data, error } = await supabase
            .from('streaks')
            .select('current_streak, max_streak')
            .eq('user_id', userId)

            if (error) {
                console.error('Error fetching data:', error);
        
            } else {
                setCurrentStreak(data[0].current_streak)
                setMaxStreak(data[0].max_streak)
            }

        }


    fetchStreaks()
},[])

//fetch note text
 useEffect(() => {
    const getNoteText = async () => {
        const supabase = createClient()
        const user = await supabase.auth.getUser()
        const userId = user?.data?.user?.id

        const { data, error } = await supabase
            .from('notes')
            .select('content')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching data:', error);
        } else {
            if (data && data.length > 1) {
                const noteMerged: Array<string> = []
                data.map((item) => {
                    noteMerged.push(item.content)                
                })
                // console.log('noteMerged', noteMerged)
                const noteMergedWordCount = noteMerged.join(' ').trim().split(/\s+/).length
                setNotesText(noteMergedWordCount)
            }
        }
    }
    getNoteText()
    
}, [])

// console.log('notesText', notesText[0].content)


    // console.log('notesDateArray', notesDateArray)

    return (
        <div className="max-w-md mx-auto mt-24">


            {/* Year Progress */}
            <div className="component-bg w-full p-6 overflow-hidden">


                <div className="flex gap-3 text-xs ml-2 mb-2 ">
                    {months.map((item) => {
                        return <div key={item}>{item}</div>
                    })}
                </div>

                <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-y-auto scrollbar-hide">



                    {/* {getAllDaysInYear().map((day, index) => {
                        return (
                            <div key={index} className={cellStyleMissed}>

                                {notesDateArray
                                    .filter((doneDay) => isSameDay(doneDay.note_date, day))
                                    .map((doneDay) => {
                                        return <div key={`done-${doneDay}`} className={cellStyleDone} />
                                    })}
                            </div>
                        )
                    })} */}

                    {getAllDaysInYear().map((day) => {
                        const hasNote = notesDateArray.some(note => isSameDay(note.note_date, day));

                        return (
                            <div key={day} className={hasNote ? cellStyleDone : cellStyleMissed} />
                        );
                    })}



                </div>
            </div>

            {/* Other stats */}
            <div className="grid grid-flow-col grid-rows-2 gap-4 w-full mt-4">
                <div className="component-bg p-6">Entries <p className="text-xl font-bold text-white">{notesDateArray.length}</p></div>
                <div className="component-bg p-6">Current Streak <p className="text-xl font-bold text-white">{currentStreak}</p></div>
                <div className="component-bg p-6">Longest Streak <p className="text-xl font-bold text-white">{maxStreak}</p></div>
                <div className="component-bg p-6">Words <p className="text-xl font-bold text-white">{notesText}</p></div>
                <div className="component-bg p-6">Writing frequency <p className="text-xl font-bold text-white">{((notesDateArray.length/getAllDaysInYear().length)*100).toFixed(2) + '%'}</p></div>
            </div>


        </div>
    )
}