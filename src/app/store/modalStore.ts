import { create } from "zustand";

type ModalState = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  modalOpen: false,
  setModalOpen: (open) => set({ modalOpen: open }),
}));
