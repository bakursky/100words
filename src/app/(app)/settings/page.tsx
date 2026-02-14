
'use client'
import Image from "next/image";
import { LogoutButton } from "@/app/components/LogoutButton";
import { useUserData } from "@/app/hooks/useUserData";
import { DownloadNotesButton } from "@/app/components/DownloadNotesButton";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { usePaywallStore } from "@/app/store/paywallStore";

export default function Settings() {
    const { data: user, isLoading } = useUserData();
    const [spellCheck, setSpellCheck] = useState(true);
    const [selectedValue, setSelectedValue] = useState('');
    const { paywallValue, paywallToggle } = usePaywallStore()
    // const { setWeekStart } = useWeekStartStore()
    // const [weekStart, setWeekStart] = useState('')

    useEffect(() => { if (!isLoading && !user) { redirect('/welcome') } }, [user, isLoading])

    //spellcheck logic
    useEffect(() => {
        const stored = localStorage.getItem("spellCheck");
        if (stored !== null) setSpellCheck(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("spellCheck", JSON.stringify(spellCheck));
    }, [spellCheck]);

    useEffect(() => {
        const stored = localStorage.getItem("weekStartOn");
        if (stored !== null) {
            const parsed = JSON.parse(stored).toString()
            setSelectedValue(parsed)
            // setWeekStart(parsed)
        }
    }, []);


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setSelectedValue(value)
        // setWeekStart(value) // This will update Streaks component immediately
        localStorage.setItem("weekStartOn", JSON.stringify(Number(value)))
    };


    return (
        <div className='max-w-md mx-auto px-6 mt-6 mb-20'>
            <div className='text-neutral-500 font-black text-3xl'>Settings</div>
            <div className='text-lg text-neutral-300 font-black'>Profile</div>
            <div className="flex flex-col items-center py-4 w-full component-bg">
                <Image
                    src={user?.avatar_url || "/logo.svg"}
                    width={100}
                    height={100}
                    alt="avatar"
                    className=" rounded-full mt-2"
                />

                <div className="flex flex-col mt-2 text-center">
                    <p className="font-bold text-white">{user?.name}</p>
                    <p>{user?.email}</p>
                </div>

            <button className="m-2 rounded-[40px] bg-white p-3 text-black hover:scale-95 transition-all" onClick={paywallToggle}>PRO features:{paywallValue === 1 ? "On" : "Off"}</button>
            </div>
            <LogoutButton />


            <div className='text-lg text-neutral-300 font-black mt-4'>Editor and streaks</div>
            {/* <div className="component-bg mt-4 p-4"> */}

                <DownloadNotesButton />

                <button onClick={() => setSpellCheck(!spellCheck)} className="component-bg mt-4 w-full rounded-2xl p-4 text-white">Spell check: {spellCheck ? "On" : "Off"}
                </button>
                <div className="text-xs text-neutral-500 mt-2 text-center">If the spell checker isn&apos;t working, make sure it&apos;s enabled in your browser or disable interfering extensions</div>

                <div className="component-bg mt-4 w-full rounded-2xl p-4 text-center text-white">
                    <span>First day of the week: </span>
                    <select onChange={handleChange} value={selectedValue} className="bg-[#202020] rounded-full">
                        <option value="6">Saturday</option>
                        <option value="0">Sunday</option>
                        <option value="1">Monday</option>
                    </select>
                </div>


            {/* </div> */}

        </div>
    )
}