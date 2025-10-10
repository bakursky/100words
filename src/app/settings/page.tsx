
'use client'
import Image from "next/image";
import { LogoutButton } from "../components/LogoutButton";
import { useUserData } from "../hooks/useUserData";
import { DownloadNotesButton } from "../components/DownloadNotesButton";
import { useEffect, useState } from "react";


export default function Settings() {
    const { data: user } = useUserData();
    const [spellCheck, setSpellCheck] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("spellCheck");
        if (stored !== null) setSpellCheck(JSON.parse(stored));
      }, []);
    
      useEffect(() => {
        localStorage.setItem("spellCheck", JSON.stringify(spellCheck));
      }, [spellCheck]);


    return (
        <div className='max-w-md mx-auto px-6'>

            <div className="flex items-center gap-4 w-full component-bg">
                    <Image
                        src={user?.avatar_url || "/logo.png"}
                        width={100}
                        height={100}
                        alt="avatar"
                        className=" rounded-full"
                    />

                <p className="font-semibold">{user?.name} {user?.email}</p>
            </div>

            <LogoutButton />

            <DownloadNotesButton />
            
            <button onClick={()=> setSpellCheck(!spellCheck)} className="component-bg mt-4 w-full rounded-2xl p-4">Spell check: {spellCheck ? "On" : "Off"} 
                <div className="text-xs text-neutral-500 ">If spell checker is not working, check if you have it enabled in your browser or disable extensions that can change it.</div>
                </button>
        </div>
    )
}