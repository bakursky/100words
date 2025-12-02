import { create } from "zustand";

type newEntryState = {
  newEntryOpen: boolean;
  setNewEntryOpen: (open: boolean) => void;
};

export const useNewEntryStore = create<newEntryState>((set) => ({
  newEntryOpen: false,
  setNewEntryOpen: (open) => set({ newEntryOpen: open }),
}));
