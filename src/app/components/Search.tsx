'use client'

import { useState } from "react"

export default function Search({ exportSearchPrompt }: { exportSearchPrompt: (value: string) => void }){
const [searchPrompt, setSearchPrompt] = useState('')

const inputHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchPrompt(value)
    exportSearchPrompt(value)
}

    return(
        <>
        <div className='max-w-md mx-auto mt-24'>
        <input
        value={searchPrompt}
        onChange={inputHandler}
        placeholder="Search note..."
        type="search"
        className="p-1 px-2 rounded-full border-[3px] border-neutral-800 bg-transparent placeholder:text-neutral-500 text-neutral-500 outline-none w-full"/>
        </div>
        
        </>
    )
}