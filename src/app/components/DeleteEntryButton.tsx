import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "../store/modalStore";

export default function DeleteEntryButton({ date }: { date: string }) {
    const { setModalOpen } = useModalStore()
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

            //decrease -1 when you deleting note
            const { data: streak, error: streakError } = await supabase
                .from("streaks")
                .select("current_streak")
                .eq("user_id", user.id);
            if (streakError) throw streakError;

            let current_streak = streak?.[0]?.current_streak;

            if (current_streak > 1) {
                const newStreak = current_streak - 1
                const { error: resetError } = await supabase
                    .from("streaks")
                    .update({ current_streak: newStreak })
                    .eq("user_id", user.id);
                if (resetError) throw resetError;
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
