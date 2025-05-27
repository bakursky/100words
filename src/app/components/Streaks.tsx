'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'
import { subDays, format, getDay, startOfWeek, addDays } from 'date-fns';
import { useStreakRefresh } from '../context/StreakRefreshContext';

interface Note {
    id: string;
    user_id: string;
    note_date: string;
    content?: string;
    created_at?: string;
}

export default function Streaks() {

    const [currentStreak, setCurrentStreak] = useState<number>()
    const [maxStreak, setMaxStreak] = useState<number>()
    const [notesMap, setNotesMap] = useState<Note[][]>([]);
    const formattedDate = format(new Date(), 'MMMM d, EEEE');
    const todayIndex = getDay(new Date())
    const dayOfWeeks = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    const { refreshKey } = useStreakRefresh()

    useEffect(() => {
        const fetchStreaks = async () => {
            const currentDate = new Date()
            const yesterday = subDays(currentDate, 1)
            const formatDate = format(yesterday, 'yyyy-MM-dd')
            
            const supabase = createClient()
            const user = await supabase.auth.getUser()
            const userId = user?.data?.user?.id

            //show your streaks from db
            const { data: streak, error: streakError } = await supabase
                .from('streaks')
                .select('current_streak, max_streak')
                .eq('user_id', userId)

            if (streak && streak?.length !== 0) {
                setCurrentStreak(streak[0].current_streak)
                setMaxStreak(streak[0].max_streak)

            } else { //if streaks doesn't exists then create row
                const { error } = await supabase
                    .from('streaks')
                    .insert([
                        { user_id: userId, current_streak: '0', max_streak: '0' },
                    ])
                    .select()
                    if (error) {
                        console.error('Row didnt created:', error);
                    }
            }

            if (streakError) {
                console.error('Error fetching data:', streakError);

            }
            console.log('streak:', streak)



            // now reset streak counter if yesterday you've missed
            if (streak) { //first streak cannot be dropped  && streak[0].current_streak !== 1
                console.log('Checking streak condition:', streak[0].current_streak);

                const { data: existingNote } = await supabase
                    .from('notes')
                    .select('id')
                    .eq('user_id', userId)
                    .eq('note_date', format(currentDate, 'yyyy-MM-dd'))
                    .single();

                const { data: yesterdayNote, error: yesterdayNoteError } = await supabase
                    .from('notes')
                    .select('*')
                    .eq('note_date', formatDate);

                console.log('yesterdayNote:', yesterdayNote);
                console.log('yesterdayNoteError:', yesterdayNoteError);

                if (yesterdayNote?.length === 0 && !existingNote) {
                    setCurrentStreak(0)
                    const { data: streakReset, error: streakResetError } = await supabase
                        .from('streaks')
                        .update({ current_streak: '0' })
                        .eq('user_id', userId);

                    if (streakResetError) {
                        console.error('Error resetting streak:', streakResetError);
                    } else {
                        console.log('Streak reset successfully:', streakReset);
                    }
                }
            }




        }
        fetchStreaks()
    }, [refreshKey])

    useEffect(() => {
        const dateArray: Array<string> = []
        setNotesMap([])

        const weekTracker = async () => {
            const weekStarts = startOfWeek(new Date())
            for (let i = 0; i < 7; i++) {
                const date = addDays(weekStarts, i)
                dateArray.push(format(date, 'yyyy-MM-dd'))
            }
            console.log(dateArray)
            return dateArray
        }

        const checkBd = async () => {
            const supabase = createClient()

            for (const date of dateArray) {
                const { data, error } = await supabase
                    .from('notes')
                    .select('*')
                    .eq('note_date', date);

                setNotesMap(prevNotes => [...prevNotes, data || []])
                console.log(notesMap)

                if (error) {
                    console.error(`Error fetching note for ${date}:`, error);
                }
            }

            return notesMap;
        }

        weekTracker()
        checkBd()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshKey])



    return (
        <div className='fixed w-full py-2'>

            <div className='mb-2 text-lg font-black text-neutral-500 text-center'>
                <p className='text-red-600 inline-block mr-2'>Today</p>{formattedDate}
            </div>

            <div className='flex gap-2 justify-center font-semibold'>




                {dayOfWeeks.map((item, index) => {
                    const style = 'w-8 h-8 flex items-center justify-center bg-neutral-800 text-neutral-500 rounded-full'
                    const today = 'w-8 h-8 flex items-center justify-center bg-red-700 rounded-full text-white/70'

                    const streakDay = '💯'
                    // if (todayIndex === index) {

                    // }

                    return <div key={index}>
                        <p className={todayIndex === index ? today : style}> {notesMap[index] && notesMap[index].length > 0 ? streakDay : item} </p>
                        {/* <p className={todayIndex === index ? today : style}> {item} </p> */}
                    </div>
                })}

                {/* <div className='w-8 h-8 flex items-center justify-center'>S</div>
                <div className='w-8 h-8   flex items-center justify-center'>💯</div>
                <div className='w-8 h-8 rounded-full border-[1.5px] border-neutral-700 border-dotted flex items-center justify-center'>T</div>
                <div className='w-8 h-8 flex items-center justify-center'>W</div>
                <div className='w-8 h-8  flex items-center justify-center'>T</div>
                <div className='w-8 h-8 flex items-center justify-center'>F</div>
                <div className='w-8 h-8 flex items-center justify-center'>S</div> */}


                <div className='flex  p-1 px-2 rounded-full bg-neutral-800 gap-2  text-neutral-500'>
                    <div>⚡ <span>{currentStreak}</span> </div>
                    <div>🏆 <span>{maxStreak}</span></div>
                </div>

            </div>
        </div>
    )
}