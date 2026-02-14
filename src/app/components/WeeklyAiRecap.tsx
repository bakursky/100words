'use client'

import { useEffect, useState, useRef } from "react";
import { useNotes } from "../hooks/useNotes"

const LOCAL_STORAGE_KEY = 'weekly-note-ai-recap'

export default function WeeklyAiRecap() {
    const { data: notes } = useNotes()
    const [recap, setRecap] = useState('')
    const fetchingRef = useRef(false)

    const mergedPlainText = (notes ?? [])
        .map((note) =>
            note.decrypted_content.replace(/<[^>]+>/g, "")
        )
        .join("\n\n");

    useEffect(() => {
        if (!notes || notes.length === 0) return

        const cached = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (cached) {
            setRecap(cached)
            return
        }

        if (fetchingRef.current) return
        fetchingRef.current = true

        const fetchAiRecap = async () => {
            try {
                const aiRes = await fetch("/api/ai/weekly-recap", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: mergedPlainText }),
                });

                if (!aiRes.ok) return

                const data = await aiRes.json()
                const reply: string = data.reply || ''

                setRecap(reply)

                localStorage.setItem(LOCAL_STORAGE_KEY, reply)

            } catch (error) {
                console.error("Failed to fetch AI recap:", error);
            } finally {
                fetchingRef.current = false
            }
        };


        fetchAiRecap();
    }, [notes])

    return (
        <div>


            {recap ? (
                        <div className='text-neutral-300 whitespace-pre-line break' dangerouslySetInnerHTML={{ __html: recap }}></div>
            ) : (
                <p className='component-bg w-full mt-4 p-6 text-white-300'>✦ Thinking...</p>
            )}

        </div>
    )
}