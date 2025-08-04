'use client'
import { createClient } from '@/utils/supabase/client'
import { useStreakRefresh } from '../context/StreakRefreshContext';

export default function RedButton({ wordCount, note }: { wordCount: number, note: string }) {
    const { triggerRefresh } = useStreakRefresh()

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
            body: JSON.stringify({ content: note, userId }),
        });

        if (res.ok) {
            triggerRefresh(); // 🔥
        } else {
            const errorData = await res.json();
            console.log(errorData)
        }
    };

    return (
        <button
            onClick={handleSubmit}
            disabled={wordCount < 100}
            className="w-full h-full flex items-center justify-center"
        >
            {wordCount}
        </button>
    )
}