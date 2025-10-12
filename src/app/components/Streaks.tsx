'use client'


import {  format, getDay } from 'date-fns';
import { useStreaks } from '../hooks/useStreaks';
import { useWeekTracker } from '../hooks/useWeekTracker';
import { useEffect, useState } from 'react';


export default function Streaks() {
    const today = format(new Date(), 'PPP')
    const {data:streaks} = useStreaks()
    const { data:week } = useWeekTracker()
    const [dayOfWeeks, setDayOfWeeks] = useState<string[]>(['','','','','','']);
    const [stored, setStored] = useState<string | null>(null);
    const todayIndex = (getDay(new Date()) - Number(stored || 0) + 7) %7

    useEffect(() => {
        const weekStartOn = localStorage.getItem("weekStartOn");
        if (weekStartOn !== null) {
            setStored(weekStartOn);
        }
    }, [week]);

    useEffect(()=>{
        let days: string[] = []
        if (stored === '0'){days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']}
        if (stored === '1'){days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']}
        if (stored === '6'){days = ['S', 'S', 'M', 'T', 'W', 'T', 'F']}
        setDayOfWeeks(days)
    },[stored])


    return (
        <div className='w-full py-4'>

        <div className='w-full text-center mb-2 font-semibold text-neutral-600'>
            {today}
            </div>

            <div className='flex gap-2  justify-center font-semibold text-sm text-neutral-500'> 


                {dayOfWeeks.map((item, index) => {
                    const style = 'w-8 h-8 component-bg flex items-center justify-center'
                    const today = 'w-8 h-8 component-bg flex items-center justify-center text-red-700'

                    const streakDay = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#b91c1c" d="M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.392 1.392 0 0 1 .27-1.951a1.392 1.392 0 0 1 1.953.27l2.351 3.104l5.911-9.492a1.396 1.396 0 0 1 1.921-.445c.653.406.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656c-.022.002-.042.002-.064.002z"/></svg>

                    return <div key={index} >
                        <p className={todayIndex === index ? today : style}> {week && week[index].length > 0 ? streakDay : item} </p>
                    </div>
                })}


                <div className='flex p-2 px-3 gap-2 component-bg h-8 items-center justify-center'>
                    <div className='flex' title='Current streak'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M6.803 18.998c-.194-.127 3.153-7.16 3.038-7.469c-.116-.309-3.665-1.436-3.838-1.979c-.174-.543 7.007-8.707 7.196-8.549c.188.158-3.129 7.238-3.039 7.469c.091.23 3.728 1.404 3.838 1.979c.111.575-7.002 8.676-7.195 8.549z"/></svg>
                        <span>{streaks?.current_streak}</span></div>
                    <div className='flex' title='Max streak'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M8.127 13.6c-.689 1.197-.225 2.18.732 2.732c.956.553 2.041.465 2.732-.732c.689-1.195 5.047-11.865 4.668-12.084c-.379-.219-7.442 8.888-8.132 10.084zM10 6c.438 0 .864.037 1.281.109c.438-.549.928-1.154 1.405-1.728A9.664 9.664 0 0 0 10 4C4.393 4 0 8.729 0 14.766c0 .371.016.742.049 1.103c.049.551.54.955 1.084.908c.551-.051.957-.535.908-1.086A10.462 10.462 0 0 1 2 14.766C2 9.85 5.514 6 10 6zm7.219 1.25c-.279.75-.574 1.514-.834 2.174C17.4 10.894 18 12.738 18 14.766c0 .316-.015.635-.043.943a1.001 1.001 0 0 0 1.992.182c.033-.37.051-.748.051-1.125c0-2.954-1.053-5.59-2.781-7.516z"/></svg>
                        <span className='pl-2'>{streaks?.max_streak}</span></div>
                </div>

            </div>
        </div>
    )
}