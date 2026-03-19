'use client'

import { useEffect, useState } from "react";
import { useNotes } from "../hooks/useNotes"
import { format, startOfWeek, addDays, Day, lastDayOfWeek, intervalToDuration } from "date-fns"
import { usePaywallStore } from "../store/paywallStore";

const LOCAL_STORAGE_KEY = 'weekly-note-ai-recap'
const LAST_WEEK_NOTE_KEY = 'LastWeekNote'

export default function WeeklyAiRecap() {
    const { data: notes } = useNotes()
    const [recap, setRecap] = useState('')

    const dayItem = localStorage.getItem("weekStartOn");
    const weekStartsOn = (dayItem !== null ? JSON.parse(dayItem) : 0) as Day;
    const [weekTimer, setWeekTimer] = useState({ days: 0, hours: 0, minutes: 0 })

    const weekStart = startOfWeek(new Date(), { weekStartsOn });
    const weekEnd = addDays(weekStart, 6);

    const startStr = format(weekStart, "yyyy-MM-dd");
    const endStr = format(weekEnd, "yyyy-MM-dd");

    const weekNotes = (notes ?? []).filter(n => n.note_date >= startStr && n.note_date <= endStr);

    const { paywallValue } = usePaywallStore()

    useEffect(() => {
        //don't remember about shift of the first day of the week
        const dayItem = localStorage.getItem("weekStartOn");
        const weekStartOn = dayItem !== null ? JSON.parse(dayItem) : 0;

        //calculate time from now to the end day of the week
        const now = new Date()
        const lastWeekDay = lastDayOfWeek(now, { weekStartsOn: weekStartOn })
        const duration = intervalToDuration({ start: now, end: lastWeekDay })
        setWeekTimer({
            days: duration.days ?? 0,
            hours: duration.hours ?? 0,
            minutes: duration.minutes ?? 0,
        })
    }, [])

    const mergedPlainText = weekNotes
        .map(note => note.decrypted_content.replace(/<[^>]+>/g, ""))
        .join("\n\n")

     console.log(weekNotes)   
    useEffect(() => {
        if (paywallValue === 0) return
        if (typeof window === 'undefined') return

        const lastWeekNote = mergedPlainText
        if (!lastWeekNote || lastWeekNote.trim().length === 0) return

        // Check local cache. If it matches the current week note, reuse it.
        const cachedItem = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (cachedItem) {
            try {
                const stored = JSON.parse(cachedItem)
                if (stored[LAST_WEEK_NOTE_KEY] === lastWeekNote && stored.recap) {
                    setRecap(stored.recap)
                    return
                }
            } catch {
                // Ignore malformed/legacy cache values and refetch below.
            }
        }

        // Clear recap to fire loading state.
        setRecap('')

        const fetchAiRecap = async () => {
            try {
                const aiRes = await fetch("/api/ai/weekly-recap", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: lastWeekNote }),
                });

                if (!aiRes.ok) return

                const data = await aiRes.json()
                const reply: string = data.reply || ''

                setRecap(reply)

                localStorage.setItem(
                    LOCAL_STORAGE_KEY,
                    JSON.stringify({ [LAST_WEEK_NOTE_KEY]: lastWeekNote, recap: reply })
                )

            } catch (error) {
                console.error("Failed to fetch AI recap:", error);
            }
        };


        fetchAiRecap();
    }, [notes, paywallValue, mergedPlainText])

    if (paywallValue === 0) return null
    return (
        <div>
            <div className='rounded-[40px] bg-gradient-to-tr from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-1 mt-4'>
                <div className="flex gap-8 component-bg p-6 ">
                    {weekTimer.hours < 0 ? (

                        recap ? (
                            <div className="flex flex-col">
                            <div className=' text-neutral-500 mb-2'>✦ Weekly review</div>
                            <div className='text-neutral-300 whitespace-pre-line break' dangerouslySetInnerHTML={{ __html: recap }} ></div>      
                            </div>
                        ) : (
                            <p className='component-bg w-full text-white-300'>✦ Thinking...</p>
                        )

                    ) : (
                        <>
                            <div className='font-bold'>Weekly review</div>
                            <div className='text-white/30'> Will appear after {weekTimer.days}d {weekTimer.hours}h</div>
                        </>

                    )}

                </div></div>
        </div >
    )
}