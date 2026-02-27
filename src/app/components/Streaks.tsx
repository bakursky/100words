'use client'


import { format, getDay } from 'date-fns';
// import { useStreaks } from '../hooks/useStreaks';
import { useWeekTracker } from '../hooks/useWeekTracker';
import { useEffect, useState } from 'react';

export default function Streaks() {
    const { data: week } = useWeekTracker()
    const [dayOfWeeks, setDayOfWeeks] = useState<string[]>(['', '', '', '', '', '', '']); // Add one more empty string
    const [stored, setStored] = useState<string | null>(null);
    const [weekStart, setWeekStart] = useState<number>()
    const [isMounted, setIsMounted] = useState(false);
    const [today, setToday] = useState<string | null>(null);
    const [todayIndex, setTodayIndex] = useState<number | null>(null);

      function setFirstDayByUserLocation(): number {
        try {
          const locale = new Intl.Locale(navigator.language) as Intl.Locale & { weekInfo?: { firstDay: number } };
          const firstDay = locale.weekInfo?.firstDay;
          if (firstDay !== undefined) return firstDay;
        } catch {}

        // fallback for browsers that doesn't support Intl.Locale (FireFox) 
        return navigator.language.startsWith('en-US') ? 0 : 1;
      }


      useEffect(() => {
        setIsMounted(true);
    
        const dayItem = localStorage.getItem('weekStartOn');
        const firstDay = dayItem == null
          ? setFirstDayByUserLocation()
          : Number(dayItem);
    
        if (dayItem == null) {
          localStorage.setItem('weekStartOn', String(firstDay));
        }
    
        setStored(String(firstDay));
        setWeekStart(firstDay);
        setToday(format(new Date(), 'PPP'));
        setTodayIndex((getDay(new Date()) - firstDay + 7) % 7);
    
        if (firstDay === 0) setDayOfWeeks(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
        if (firstDay === 1) setDayOfWeeks(['M', 'T', 'W', 'T', 'F', 'S', 'S']);
        if (firstDay === 6) setDayOfWeeks(['S', 'S', 'M', 'T', 'W', 'T', 'F']);
      }, []);

      if (!isMounted || today == null || weekStart == null || todayIndex == null) {
        return null;
      }

    return (
        <div className='w-96 mx-auto'>

            <div className='flex flex-col w-full text-3xl mb-2 font-black text-neutral-600'>
                <span className='text-lg text-neutral-300'>Today</span> {today}
            </div>




            <div className='flex gap-2 items-start justify-between font-semibold text-md text-neutral-500'>


                {dayOfWeeks.map((item, index) => {
                    const style = 'w-10 h-10 component-bg flex items-center justify-center rounded-full'
                    const today = 'w-10 h-10 component-bg border-2 border-neutral-600 rounded-full flex items-center justify-center'

                    const streakDay = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#d4d4d4" d="M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.392 1.392 0 0 1 .27-1.951a1.392 1.392 0 0 1 1.953.27l2.351 3.104l5.911-9.492a1.396 1.396 0 0 1 1.921-.445c.653.406.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656c-.022.002-.042.002-.064.002z" /></svg>

                    return <div key={index} >
                        <p className={todayIndex === index ? today : style}> {week && week[index].length > 0 ? streakDay : item} </p>
                    </div>
                })}


            </div>

                    
        </div>
    )
}