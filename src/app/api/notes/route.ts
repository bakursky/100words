import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    // const today = new Date().toISOString().split('T')[0];
    //convert local time zone to UTC (supabase timestamps)
    const now = new Date();
    const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();

    
    try {
        const { content, userId } = await request.json();
        const supabase = await createClient();

        if (!content || !userId) {
            return NextResponse.json(
                { error: 'Missing content or userId' },
                { status: 400 }
            );
        }


 

        // get streaks from db
        const { data: currentStreak, error: currentStreakError } = await supabase
            .from('streaks')
            .select('current_streak, max_streak')
            .eq('user_id', userId)
            .single();

        if (currentStreakError) {
            return NextResponse.json({ error: currentStreakError.message }, { status: 400 });
        }

        // Check if this is the first note of the day by querying the database
        // const { data: todaysNotes, error: notesError } = await supabase
        //     .from('notes')
        //     .select('*')
        //     .eq('user_id', userId)
        //     .eq('note_date', today);
        const { data, error: notesError } = await supabase.rpc('get_my_notes');

        if (notesError) {
            return NextResponse.json({ error: notesError.message }, { status: 400 });
        }
        const todaysNote = data.find((note: { note_date: string }) => note.note_date === today)

        // If this is the first note of the day, update streak
        console.log('⛏ todaysNote',todaysNote)
        
        if (!todaysNote) {
            const newStreak = currentStreak.current_streak + 1;

            const { error: streakError } = await supabase
                .from('streaks')
                .update({ current_streak: newStreak })
                .eq('user_id', userId);
    
            if (newStreak > currentStreak.max_streak) {
                const { error: maxStreakError } = await supabase
                    .from('streaks')
                    .update({ max_streak: newStreak })
                    .eq('user_id', userId);
    
                if (maxStreakError) {
                    return NextResponse.json({ error: maxStreakError.message }, { status: 400 });
                }
            }
    
            if (streakError) {
                return NextResponse.json({ error: streakError.message }, { status: 400 });
            }
        }

        const { error: rpcError } = await supabase.rpc('insert_or_update_note', {
            p_content: content,
            p_note_date: today
        });

        if (rpcError) {
            return NextResponse.json({ error: rpcError.message }, { status: 500 });
        }

        // Always return a success response
        return NextResponse.json({ message: 'Note saved successfully' }, { status: 200 });

    } catch (err) {
        console.error('Error processing note:', err);
        return NextResponse.json(
            { error: 'Invalid request payload' },
            { status: 400 }
        );
    }
}
