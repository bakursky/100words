import { useQuery } from "@tanstack/react-query";
import { fetchStreaks, StreakData } from "../lib/streaks";

export function useStreaks() {
  return useQuery<StreakData>({
    queryKey: ["streaks"],
    queryFn: fetchStreaks,
  });
}

