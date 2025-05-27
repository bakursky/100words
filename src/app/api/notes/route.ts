import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
    try {
        const { content, userId } = await request.json();
        const supabase = await createClient()

        if (!content || !userId) {
            return NextResponse.json(
                { error: 'Missing content or userId' },
                { status: 400 }
            );
        }

        // Get the current date (YYYY-MM-DD format)
        const today = new Date().toISOString().split('T')[0];

        // Check if a note exists for this user and today
        const { data: existingNote, error: fetchError } = await supabase
            .from('notes')
            .select('id')
            .eq('user_id', userId)
            .eq('note_date', today)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            // Ignore "no rows found" error
            return NextResponse.json({ error: fetchError.message }, { status: 500 });
        }

        if (existingNote) {
            // Update the existing note
            const { error: updateError } = await supabase
                .from('notes')
                .update({ content })
                .eq('id', existingNote.id);

            if (updateError) {
                return NextResponse.json({ error: updateError.message }, { status: 500 });
            }

            return NextResponse.json({ message: 'Note updated successfully' }, { status: 200 });
        } else {
            // Insert a new note
            const { error: insertError } = await supabase
                .from('notes')
                .insert([{ user_id: userId, content, note_date: today }]);

            if (insertError) {
                return NextResponse.json({ error: insertError.message }, { status: 500 });
            }


            // Increment the streak since no note exists for today
            const { data: currentStreak, error: currentStreakError } = await supabase
                .from('streaks')
                .select('current_streak, max_streak')
                .eq('user_id', userId)
                .single();

            if (currentStreakError) {
                return NextResponse.json({ error: currentStreakError.message }, { status: 400 });
            }

            const newStreak = currentStreak.current_streak + 1;

            const { error: streakError } = await supabase
                .from('streaks')
                .update({ current_streak: newStreak })
                .eq('user_id', userId);


            //check if current streak is less than max streak
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

            return NextResponse.json({ message: 'Note saved successfully' }, { status: 200 });
        }
    } catch (err) {
        console.error('Error processing note:', err);
        return NextResponse.json(
            { error: 'Invalid request payload' },
            { status: 400 }
        );
    }
}

