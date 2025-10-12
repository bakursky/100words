'use client'

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
// import { Modal } from '../components/Modal';
import { useNotes } from "@/app/hooks/useNotes";
import DeleteEntryButton from '@/app/components/DeleteEntryButton';
import { useUserData } from '@/app/hooks/useUserData';
import { redirect } from 'next/navigation';

export default function Entries() {
    const { data: notes } = useNotes();
    const { data: user, isLoading } = useUserData()
    const [search, setSearch] = useState('');

    useEffect(()=>{if (!isLoading && !user){redirect('/welcome')}}, [user, isLoading])

    const filterNotes = notes?.slice()
        .filter((note) => {
            const contentMatch = note.decrypted_content.toLowerCase().includes(search.toLowerCase());
            return contentMatch;

    })

    return (
        <div className='max-w-md mx-auto'>


            <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="component-bg w-full p-2 px-4 outline-none mb-6"
                placeholder="Search note..."
            />



            <div className="grid grid-cols-1 gap-6">
                {filterNotes?.length ? (
                    filterNotes.map((item) => (
                        <div key={item.id} className="component-bg p-6 w-full text-white">

                            <div className='text-neutral-500 text-sm flex justify-between'>
                                {format(new Date(item.note_date), 'MMMM d, yyyy')}
                                <DeleteEntryButton date={item.note_date}/>
                            </div>

                            <div className='text-neutral-300 whitespace-pre-line'>
                                {item.decrypted_content}
                            </div>

                        </div>
                    ))
                ) : (
                    <div className='w-full text-center text-neutral-500'>
                        No notes found
                    </div>
                )}

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