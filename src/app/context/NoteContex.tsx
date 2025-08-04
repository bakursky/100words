'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface NoteContextType {
    note: string
    wordCount: number
    setNote: (note: string) => void
    setWordCount: (count: number) => void
}

const NoteContext = createContext<NoteContextType | undefined>(undefined)

export function NoteProvider({ children }: { children: ReactNode }) {
    const [note, setNote] = useState('')
    const [wordCount, setWordCount] = useState(0)

    return (
        <NoteContext.Provider value={{ note, wordCount, setNote, setWordCount }}>
            {children}
        </NoteContext.Provider>
    )
}

export function useNote() {
    const context = useContext(NoteContext)
    if (context === undefined) {
        throw new Error('useNote must be used within a NoteProvider')
    }
    return context
}