// pages/notes.tsx
'use client'

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'
import { useNote } from '../context/NoteContex';
import { format } from 'date-fns';

export default function NotesPage() {
    const { note, setNote, setWordCount } = useNote()
    const formattedDate = format(new Date(), 'MMMM d, EEEE');

    useEffect(() => {
        // Fetch today's note when the component loads
        const entry = localStorage.getItem('entry');
        if (entry) {
            setNote(entry);
            setWordCount(entry.trim().split(/\s+/).length);
        }

        const fetchNote = async () => {
            const supabase = await createClient();
            const user = await supabase.auth.getUser();
            const userId = user?.data?.user?.id;

            if (!userId) {
                return;
            }

            const today = new Date().toISOString().split('T')[0];

            const { data, error } = await supabase
                .from('notes')
                .select('content')
                .eq('user_id', userId)
                .eq('note_date', today)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.log(error)
            } else if (data) {
                setNote(data.content); // Load the note content
                setWordCount(data.content.trim().split(/\s+/).length)
            }

        };

        fetchNote();
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value)
        localStorage.setItem('entry', e.target.value)
        const words = e.target.value.trim().split(/\s+/)
        setWordCount(words ? words.length : 0)
    }


    return (
        
        <div className="flex h-full w-screen overflow-hidden">
            
                {/* Smooth fade-out overlay for textarea */}
                {/* <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/4 h-48 bg-gradient-to-t from-background via-background/95 via-background/85 via-background/70 via-background/50 via-background/25 to-transparent pointer-events-none z-10'></div> */}
                
                {/* Additional blur layer for extra smoothness */}
                {/* <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/4 h-24 bg-background/30 backdrop-blur-sm pointer-events-none z-10'></div> */}
            <div className="flex flex-col w-full items-center justify-center mt-24 overflow-hidden">
                <p className='text-xs text-white/30 absolute top-0 mt-28 z-10'>{formattedDate}</p> 

                <textarea
                    value={note}
                    onChange={(e) => handleChange(e)}
                    required
                    spellCheck="false"
                    className='textarea-bg bg-transparent font-inria caret-red-600 text-neutral-200 selection:bg-neutral-700/50 text-xl p-14 px-16 max-w-full w-2/4 h-screen outline-none resize-none scrollbar-hide'
                />
            </div>

        </div>

    );
}
