import { useState } from "react"
import { Modal } from "./Modal"
import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from "@tanstack/react-query";

export default function DeleteEntryButton({ date }: { date: string }) {
    const [modalOpen, setModalOpen] = useState(false)
    const queryClient = useQueryClient()

    const deleteNote = async ()=>{

            const supabase = await createClient()
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return [];

            const { error: rpcError } = await supabase.rpc('insert_or_update_note', {
                p_content: 'Deleted',
                p_note_date: date
            });
    
            if (rpcError) {
                console.error(rpcError);
                throw rpcError;
            }

            queryClient.invalidateQueries({ queryKey: ['notes'] })
            setModalOpen(false)

    }

    function onClose(){
        setModalOpen(false)
    }


    return (
        <>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                Delete this note permanently?
                        
                    <div className="flex gap-2 justify-center">
                        <button onClick={()=>{deleteNote()}} className="text-white/80 bg-red-700 p-2 rounded-full mt-2">Delete</button>
                        <button onClick={() => { onClose() }} className="text-white/80 bg-neutral-700 p-2 rounded-full mt-2">Close</button>
                    </div>
            </Modal>

            <button onClick={() => setModalOpen(true)} className="text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#991b1b" d="M10 3a7 7 0 1 0 .001 13.999A7 7 0 0 0 10 3z"/></svg>
            </button>
        </>
    )
}
