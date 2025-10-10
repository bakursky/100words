import { createClient } from "@/utils/supabase/client";
import { format, subDays } from "date-fns";

export type StreakData = {
  current_streak: number;
  max_streak: number;
};

export async function fetchStreaks(): Promise<StreakData> {
  const currentDate = new Date();
  const yesterday = subDays(currentDate, 1);
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;
  if (!userId) throw new Error("User not logged in");

  // check streak row
  const { data: streak, error: streakError } = await supabase
    .from("streaks")
    .select("current_streak, max_streak")
    .eq("user_id", userId);

  if (streakError) throw streakError;

  if (!streak || streak.length === 0) {
    // create streak row if not exists
    const { error } = await supabase.from("streaks").insert([
      { user_id: userId, current_streak: 0, max_streak: 0 },
    ]);
    if (error) throw error;
    return { current_streak: 0, max_streak: 0 };
  }

  const { max_streak } = streak[0];
  let { current_streak} = streak[0];

  // check today’s and yesterday’s notes
  const todayStr = format(currentDate, "yyyy-MM-dd");
  const yesterdayStr = format(yesterday, "yyyy-MM-dd");

  const { data: todayNote } = await supabase
    .from("notes")
    .select("id")
    .eq("user_id", userId)
    .eq("note_date", todayStr)
    .maybeSingle();

  const { data: yesterdayNotes } = await supabase
    .from("notes")
    .select("id")
    .eq("user_id", userId)
    .eq("note_date", yesterdayStr);

  // reset streak if broken
  if (!todayNote && yesterdayNotes?.length === 0) {
    current_streak = 0;
    const { error: resetError } = await supabase
      .from("streaks")
      .update({ current_streak: 0 })
      .eq("user_id", userId);
    if (resetError) throw resetError;
  }

  return { current_streak, max_streak };
}
