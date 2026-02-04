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
    const { modalOpen, setModalOpen } = useModalStore()
    const [itemDate, setItemDate] = useState('')

    useEffect(() => { if (!isLoading && !user) { redirect('/welcome') } }, [user, isLoading])

    const filterNotes = notes?.slice()
        .filter((note) => {
            const contentMatch = note.decrypted_content.toLowerCase().includes(search.toLowerCase());
            return contentMatch;

        })

    return (
        <div className='max-w-md w-96 mx-auto mt-6 mb-20'>

            {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#525252" d="m17.545 15.467l-3.779-3.779a6.15 6.15 0 0 0 .898-3.21c0-3.417-2.961-6.377-6.378-6.377A6.185 6.185 0 0 0 2.1 8.287c0 3.416 2.961 6.377 6.377 6.377a6.15 6.15 0 0 0 3.115-.844l3.799 3.801a.953.953 0 0 0 1.346 0l.943-.943c.371-.371.236-.84-.135-1.211zM4.004 8.287a4.282 4.282 0 0 1 4.282-4.283c2.366 0 4.474 2.107 4.474 4.474a4.284 4.284 0 0 1-4.283 4.283c-2.366-.001-4.473-2.109-4.473-4.474z" /></svg> */}
            
            <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="fixed w-96 component-bg p-2 px-4 outline-none mb-6 border-2 border-purple-500 focus:border-neutral-700 text-white"
                placeholder="Search note..."
            />



            <div className="grid grid-cols-1 gap-6 pt-16">
                {filterNotes?.length ? (
                    filterNotes.map((item) => (
                        <div key={item.id}>

                            <div className='text-neutral-500 font-black text-lg flex justify-center gap-4 mb-2 px-4'>
                                {format(new Date(item.note_date), 'MMMM d, yyyy')}
                                <button onClick={() => { setModalOpen(true); setItemDate(item.note_date) }} className='hover:scale-125 transition-all'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20"><path fill="#737373" d="M10 1.6a8.4 8.4 0 1 0 0 16.8a8.4 8.4 0 0 0 0-16.8zm5 9.4H5V9h10v2z" /></svg>
                                </button>
                            </div>

                            <div className='p-6 text-neutral-300 whitespace-pre-line break-words component-bg w-full'>

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
                    <DeleteEntryButton date={itemDate} />
                    <button onClick={() => { setModalOpen(false) }} className="text-white/80 bg-neutral-700 p-2 rounded-full mt-2">Close</button>
                </div>
            </Modal>

        </div>
    )
}