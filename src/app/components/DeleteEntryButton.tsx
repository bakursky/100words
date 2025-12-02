import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "../store/modalStore";

export default function DeleteEntryButton({ date }: { date: string }) {
    const {setModalOpen} = useModalStore()
    const queryClient = useQueryClient()
    const now = new Date();
    const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];

    const deleteNote = async () => {

        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;


        if (date === today) {
            const { error } = await supabase
                .from('notes')
                .delete()
                .eq('user_id', user.id)
                .eq('note_date', today);

            if (error) {
                console.error('Error deleting note:', error);
                return;
            }
        } else {
            const { error: rpcError } = await supabase.rpc('insert_or_update_note', {
                p_content: '',
                p_note_date: date
            });

            if (rpcError) {
                console.error(rpcError);
                throw rpcError;
            }
        }


        queryClient.invalidateQueries({ queryKey: ['notes'] })
        setModalOpen(false)

    }


    return (
        <>
            <button onClick={() => { deleteNote() }} className="text-white/80 bg-red-700 p-2 rounded-full mt-2">Delete</button>
        </>
    )
}
