import { create } from "zustand"

type TextAreaState = {
    value: string
    setValue: (val: string) => void
}

export const useTextAreaStore = create<TextAreaState>((set) => ({
    value: "",
    setValue: (val) => set({value: val})
}))