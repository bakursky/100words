'use client'
import { createClient } from '@/utils/supabase/client'
import { useTextAreaStore } from '../store/textAreaStore';
import { useQueryClient } from '@tanstack/react-query';

export default function RedButton() {
    const {value} = useTextAreaStore()
    const queryClient = useQueryClient()

    const wordCounter= () =>{
        const words = value.trim().split(/\s+/).filter(word => word.replace(/[^\p{L}\p{N}]/gu, '').length > 0)
        if (value === '') { return 0 }
        else { return words.length }
    }

    const handleSubmit = async (e: React.MouseEvent) => {
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
            body: JSON.stringify({ content: value, userId }),
        });

        if (res.ok) {
            queryClient.invalidateQueries({ queryKey: ['streaks'] })
            queryClient.invalidateQueries({ queryKey: ['weekTracker'] })

        } else {
            const errorData = await res.json();
            console.log(errorData)
        }
    };

    const buttonColor =() => {
        const baseStyle = 'flex w-[65px] h-[65px] rounded-full items-center justify-center mb-8 text-xl font-bold text-white/70'
        return wordCounter() < 100 ? baseStyle + ' bg-neutral-700' : baseStyle + ' bg-red-700 transition-all'
    }

    return (
        <button
            onClick={handleSubmit}
            disabled={wordCounter() < 100}
            className={buttonColor()}
        >
            {wordCounter()}
        </button>
        
    )
}