
import { create } from 'zustand'

interface WeekStartStore {
  weekStart: string
  setWeekStart: (value: string) => void
}

export const useWeekStartStore = create<WeekStartStore>((set) => ({
  weekStart: '0',
  setWeekStart: (value: string) => set({ weekStart: value }),
}))