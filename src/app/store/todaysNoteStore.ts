import { create } from "zustand";
import type { Note } from "../hooks/useNotes";
import { useTextAreaStore } from "./textAreaStore";

type TodaysNoteState = {
  todaysNote: string;
  setTodaysNote: (note: string) => void;
  filterAndSetTodaysNote: (notes: Note[] | undefined) => void;
};

export const useTodaysNoteStore = create<TodaysNoteState>((set) => ({
  todaysNote: "",
  setTodaysNote: (note) => set({ todaysNote: note }),
  filterAndSetTodaysNote: (notes) => {
    const now = new Date();
    const today = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    if (notes && notes.length > 0) {
      const todaysNote = notes.find((note) => note.note_date === today);
      if (todaysNote) {
        const content = todaysNote.decrypted_content;
        set({ todaysNote: content });
        // Optionally update textAreaStore here
        useTextAreaStore.getState().setValue(content);
        return content;
      }
    }
    // Clear the store when today's note is not found
    set({ todaysNote: "" });
    useTextAreaStore.getState().setValue("");
    return "";
  },
}));