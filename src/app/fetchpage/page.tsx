'use client'

import { useUserData } from "../hooks/useUserData";
import { useNotes } from "../hooks/useNotes";
import { useStreaks } from "../hooks/useStreaks";
import { useWeekTracker } from "../hooks/useWeekTracker";

export default function FetchPage() {
    const { data: user } = useUserData();
    const { data: notes } = useNotes();
    const { data: streaks } = useStreaks();
    const { data: week } = useWeekTracker();
    console.log(week)
    return (
        <div>
            <h1>Hello {user?.name}</h1>
            <p>Streak: {streaks?.current_streak}</p>
            <p>Max Streak: {streaks?.max_streak}</p>
            <p>Notes: {notes?.length}</p>
            {notes?.map((item, i)=>(
                    <p className="my-4" key={i}>{item.decrypted_content}</p>
                ))
            }
                </div>
  );
}
