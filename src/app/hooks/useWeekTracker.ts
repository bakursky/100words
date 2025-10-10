import { useQuery } from "@tanstack/react-query";
import { fetchWeekNotes } from "../lib/weekTracker";

export function useWeekTracker() {
  return useQuery({
    queryKey: ["weekTracker"],
    queryFn: fetchWeekNotes,
  });
}
