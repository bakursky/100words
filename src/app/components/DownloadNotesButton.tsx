'use client'

import { useNotes } from "../hooks/useNotes"

import { saveAs } from 'file-saver'

export function DownloadNotesButton() {
    const { data: notes } = useNotes()

    const handleDownload = async () => {
        const textContent = (notes ?? []).map((item) => 
            `${item.note_date}\n${item.decrypted_content}\n\n`
        ).join('')
        
        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' })

        saveAs(blob, `notes_${new Date().toISOString().slice(0, 10)}.txt`)
        

    }

    return (
        <>
            <button onClick={handleDownload} className='mt-4 w-full rounded-2xl p-4 component-bg text-white'>
                Download notes
                <div className="text-xs text-neutral-500 ">in .txt file</div>
            </button>
        </>
    )
}