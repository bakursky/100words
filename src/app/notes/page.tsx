// pages/notes.tsx
'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'
import { useStreakRefresh } from '../context/StreakRefreshContext';



export default function NotesPage() {
    const [note, setNote] = useState<string>(''); 

    const [wordCount, setWordCount] = useState(0)

    const {triggerRefresh} = useStreakRefresh()


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


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const supabase = await createClient();
        const user = await supabase.auth.getUser();
        const userId = user?.data?.user?.id;

        if (!userId) {
            console.log('User not authenticated')
            return;
        }

        const res = await fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: note, userId }),
        });

        if (res.ok) {
            triggerRefresh(); // 🔥
        } else {
            const errorData = await res.json();
            console.log(errorData)
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value)
        localStorage.setItem('entry', e.target.value)
        const words = e.target.value.trim().split(/\s+/)
        setWordCount(words ? words.length : 0)
    }


    return (
        <div className="h-full">




                <form onSubmit={handleSubmit} className='h-full'>


  
                        <textarea
                            value={note} 
                            onChange={(e) => handleChange(e)}
                            placeholder="Write your note here..."
                            required
                            spellCheck="false"
                            className='caret-red-600 text-neutral-200 selection:bg-neutral-800 bg-transparent text-4xl w-full h-full outline-none resize-none scrollbar-hide -m-1 md:p-28 p-8'
                        />


                        {/* <div className='absolute text-sm text-red-600 bottom-0 right-0 mr-4 mb-4'>{wordCount} words</div> */}

                    {/* <button type="submit" disabled={wordCount < 100} className=' mt-5 bg-red-700 disabled:bg-transparent disabled:border-dashed disabled:border-[1.5px] disabled:cursor-not-allowed disabled:text-current p-2 hover:scale-95 rounded-2xl text-white mr-2'>
                        Publish

                    </button> */}

                    {/* {wordCount < 100 ? 'Write 100 word to activate button' : 'You did it 😉'} */}
<button type="submit" disabled={wordCount < 100}  className='w-24 h-24 m-12 mb-24 rounded-full bg-red-600 disabled:bg-neutral-800 fixed bottom-0 right-0 '><span className='text-3xl font-bold'>{wordCount}</span></button>
                </form>







     

        </div>
    );
}