'use client'

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client'
import { format } from 'date-fns';
// import { Modal } from '../components/Modal';
import Search from '../components/Search';

export default function Entries() {

    const [feedNotes, setFeedNotes] = useState<Array<{ content: string; note_date: string }>>([]);
    // const [modalOpen, setModalOpen] = useState(false);
    // const [selectedNote, setSelectedNote] = useState<{ content: string; note_date: string } | null>(null);


    const [importSearchPrompt, setImportSearchPrompt] = useState("");
    // const [savedNotes, setSavedNotes] = useState<Array<{ content: string; note_date: string }>>([])
    const originalNotesRef = useRef<Array<{ content: string; note_date: string }>>([]);




    useEffect(() => {
        const noteFeed = async () => {
            const supabase = await createClient()
            const user = await supabase.auth.getUser()
            const userId = user?.data?.user?.id
            const today = new Date();
            const formattedDate = format(today, 'yyyy-MM-dd');

            const { data, error } = await supabase
                .from('notes')
                .select('content, note_date')
                .eq('user_id', userId)
                .neq('note_date', formattedDate)
                .order('note_date', { ascending: false });
                if (!error && data) {
                    originalNotesRef.current = data;
                    setFeedNotes(data);
                  } else {
                    console.error(error);
                  }
                
        }
        noteFeed()
    }, [])


    useEffect(()=>{


        if(importSearchPrompt.length > 0){
            const searchFeed = async () =>{
                const supabase = await createClient()
                const result = await supabase
                .from("notes")
                .select("content, note_date")
                .textSearch("content", importSearchPrompt, {
                  type: "websearch", config: "english",
                });
                setFeedNotes(result.data || [])
            }
            searchFeed()
        } else{
            // setFeedNotes(savedNotes)
            setFeedNotes(originalNotesRef.current); 
        }
        
    }, [importSearchPrompt])

    return (
        <div className='max-w-md mx-auto mt-24'>

        <Search exportSearchPrompt={setImportSearchPrompt} />

            <div className='flex items-center justify-center py-4 text-neutral-400'>
                <div>Oh boy, you have <span className='font-bold'>{feedNotes.length}</span> journal entries!</div>
            </div>


            <div className="grid grid-cols-1 gap-6">


                {feedNotes.map((item, index) => (
                    <div key={`post-${index}`}  className="component-bg p-6 w-full text-white">

                        <div className='text-neutral-500 text-sm '>
                            {format(new Date(item.note_date), 'MMMM d, yyyy')}
                        </div>

                        <div className='text-neutral-200 whitespace-pre-line font-inria'>
                            {item.content}
                        </div>

                    </div>
                ))}
            </div>

            {/* 
            //inside div  onClick={() => setSelectedNote(item)}


            <Modal
                isOpen={selectedNote !== null}
                onClose={() => setSelectedNote(null)}
            >
                {selectedNote?.content}
            </Modal> */}

        </div>
    )
}