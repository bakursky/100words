//this component fetch ai recap from OpenRouter and save output in localStorage
// and reuse it until user edit the note to save tokens

'use client'

import { useEffect, useState } from 'react';
import { useTodaysNoteStore } from '../store/todaysNoteStore';
import { usePaywallStore } from '../store/paywallStore';


const LOCAL_STORAGE_KEY = 'todays-note-ai-recap'

export default function TodayEntryAiRecap() {

    const { todaysNote } = useTodaysNoteStore()
    const [recap, setRecap] = useState('')
    
    const { paywallValue } = usePaywallStore()


    useEffect(() => {
        if (paywallValue === 0) return  
        if (typeof window === 'undefined') return

        //check note from local storage. if it exist and matches from todays note → reuse ai recap
        const RecapItem = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (RecapItem) {
            const stored = JSON.parse(RecapItem)

            if (stored.todaysNote == todaysNote && stored.recap) {
                setRecap(stored.recap)
                return
            } 
        }

        //clear recap to fire loading state
        setRecap('')

        //fetch ai recap and fill the save to localStorage
        if (todaysNote && todaysNote.trim().length > 0) {
            const fetchAiRecap = async () => {
                try {
                    const aiRes = await fetch("/api/ai", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ message: todaysNote }),
                    });

                    if (!aiRes.ok) return

                    const data = await aiRes.json()
                    const reply: string = data.reply || ''

                    setRecap(reply)

                    localStorage.setItem(LOCAL_STORAGE_KEY,
                        JSON.stringify({ todaysNote, recap: reply })
                    )

                } catch (error) {
                    console.error("Failed to fetch AI recap:", error);
                }
            };

            fetchAiRecap();
        }
    }, [todaysNote, paywallValue]);

    if (paywallValue === 0) return null
    return (
        <div className='flex-col w-96 h-full p-6 mt-4 bg-purple-900/50 rounded-[40px]'>
            <div className='font-bold text-purple-400 flex mb-2'>
                AI Recap
            </div>

            {recap ? (
                <div className='text-purple-200 whitespace-pre-line break' dangerouslySetInnerHTML={{ __html: recap }}></div>
            ) : (
                <p className='text-purple-200'>✦ Thinking...</p>
            )}

        </div>
    )
}