import { create } from "zustand";


type TodaysNoteSummary = {
  aiResponse: string;
  setAiResponse: (response: string) => void;
};

export const useTodaysNoteSummary = create<TodaysNoteSummary>((set) => ({
  aiResponse: "",
  setAiResponse: (response) => set({ aiResponse: response }),
}));