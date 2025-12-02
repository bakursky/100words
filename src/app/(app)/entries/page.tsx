'use client'

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
// import { Modal } from '../components/Modal';
import { useNotes } from "@/app/hooks/useNotes";
import DeleteEntryButton from '@/app/components/DeleteEntryButton';
import { useUserData } from '@/app/hooks/useUserData';
import { redirect } from 'next/navigation';
import { Modal } from '@/app/components/Modal';
import { useModalStore } from '@/app/store/modalStore';


export default function Entries() {
    const { data: notes } = useNotes();
    const { data: user, isLoading } = useUserData()
    const [search, setSearch] = useState('');
    // const [modalOpen, setModalOpen] = useState(false)
    const {modalOpen, setModalOpen} = useModalStore( )
    const [itemDate , setItemDate] = useState('')

    useEffect(() => { if (!isLoading && !user) { redirect('/welcome') } }, [user, isLoading])

    const filterNotes = notes?.slice()
        .filter((note) => {
            const contentMatch = note.decrypted_content.toLowerCase().includes(search.toLowerCase());
            return contentMatch;

        })

    return (
        <div className='max-w-md mx-auto mt-6 mb-20'>


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
                                <button onClick={() => {setModalOpen(true); setItemDate(item.note_date)}} className="text-red-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20"><path fill="#991b1b" d="M10 1.6a8.4 8.4 0 1 0 0 16.8a8.4 8.4 0 0 0 0-16.8zm5 9.4H5V9h10v2z" /></svg>
                                </button>
                            </div>

                            <div className='pt-2 text-neutral-400 whitespace-pre-line break-words'>

                                {item.decrypted_content === '' ? 'Deleted' : item.decrypted_content}
                            </div>

                        </div>
                    ))
                ) : (
                    <div className='w-full text-center text-neutral-500'>
                        No notes found
                    </div>
                )}

            </div>


            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                Delete this note permanently?

                <div className="flex gap-2 justify-center">
                    <DeleteEntryButton date={itemDate}/>
                    <button onClick={() => {setModalOpen(false)}} className="text-white/80 bg-neutral-700 p-2 rounded-full mt-2">Close</button>
                </div>
            </Modal>

        </div>
    )
}