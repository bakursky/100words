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
        <div className='fixed w-full py-2 mt-8'>



            <div className='flex gap-2  justify-center font-semibold text-sm text-neutral-500'>




                {dayOfWeeks.map((item, index) => {
                    const style = 'w-8 h-8 component-bg flex items-center justify-center'
                    const today = 'w-8 h-8 component-bg flex items-center justify-center text-red-500'

                    const streakDay = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#b91c1c" d="M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.392 1.392 0 0 1 .27-1.951a1.392 1.392 0 0 1 1.953.27l2.351 3.104l5.911-9.492a1.396 1.396 0 0 1 1.921-.445c.653.406.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656c-.022.002-.042.002-.064.002z"/></svg>
                    // if (todayIndex === index) {

                    // }

                    return <div key={index} >
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


                <div className='flex p-2 px-3 gap-2 component-bg h-8 items-center justify-center'>
                    <div className='flex' title='Current streak'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M6.803 18.998c-.194-.127 3.153-7.16 3.038-7.469c-.116-.309-3.665-1.436-3.838-1.979c-.174-.543 7.007-8.707 7.196-8.549c.188.158-3.129 7.238-3.039 7.469c.091.23 3.728 1.404 3.838 1.979c.111.575-7.002 8.676-7.195 8.549z"/></svg>
                        <span>{currentStreak}</span></div>
                    <div className='flex' title='Max streak'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M8.127 13.6c-.689 1.197-.225 2.18.732 2.732c.956.553 2.041.465 2.732-.732c.689-1.195 5.047-11.865 4.668-12.084c-.379-.219-7.442 8.888-8.132 10.084zM10 6c.438 0 .864.037 1.281.109c.438-.549.928-1.154 1.405-1.728A9.664 9.664 0 0 0 10 4C4.393 4 0 8.729 0 14.766c0 .371.016.742.049 1.103c.049.551.54.955 1.084.908c.551-.051.957-.535.908-1.086A10.462 10.462 0 0 1 2 14.766C2 9.85 5.514 6 10 6zm7.219 1.25c-.279.75-.574 1.514-.834 2.174C17.4 10.894 18 12.738 18 14.766c0 .316-.015.635-.043.943a1.001 1.001 0 0 0 1.992.182c.033-.37.051-.748.051-1.125c0-2.954-1.053-5.59-2.781-7.516z"/></svg>
                        <span className='pl-2'>{maxStreak}</span></div>
                </div>

            </div>
        </div>
    )
}