
'use client'
import { createClient } from "@/utils/supabase/client"
import Image from "next/image";
import { useEffect, useState } from "react"
import { LogoutButton } from "../components/LogoutButton";


export default function Settings() {

    const [userData, setUserData] = useState<{ avatar_url: string; name: string; email: string } | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const supabase = createClient();
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                console.error('Error fetching user data:', error);
            } else if (user) {
                console.log(user)
                setUserData({
                    avatar_url: user.user_metadata.avatar_url || '',
                    name: user.user_metadata.name || 'User',
                    email: user.user_metadata.email || 'User'
                });
            }
        };


        fetchUserData()
    }, [])

    return (
        <div className='max-w-md mx-auto px-6 mt-24'>

            <div className="flex items-center gap-4 w-full component-bg">
                {userData && (
                    <Image
                        src={userData?.avatar_url}
                        width={100}
                        height={100}
                        alt="avatar"
                        className=" rounded-full"
                    />
                )}

                <p className="text-lg font-bold">{userData?.name} {userData?.email}</p>
            </div>

            <LogoutButton />
        </div>
    )
}