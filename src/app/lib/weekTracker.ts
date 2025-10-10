import { addDays, startOfWeek, format } from "date-fns";
import { createClient } from "@/utils/supabase/client";

export async function fetchWeekNotes() {
  const weekStart = startOfWeek(new Date());
  const supabase = await createClient();

  const dates = Array.from({ length: 7 }).map((_, i) =>
    format(addDays(weekStart, i), "yyyy-MM-dd")
  );

  const results = await Promise.all(
    dates.map(async (date) => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("note_date", date);

      if (error) {
        console.error(`Error fetching for ${date}:`, error);
        return [];
      }
      return data ?? [];
    })
  );

  return results;
}
