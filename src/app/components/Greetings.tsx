
'use client'
import { createClient } from "@/utils/supabase/client"
import { format } from "date-fns";
import { useEffect, useState } from "react"

export default function () {
    const formattedDate = format(new Date(), 'MMMM d, EEEE');
    // const [userData, setUserData] = useState<{ avatar_url: string; name: string } | null>(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         const supabase = createClient();
    //         const { data: { user }, error } = await supabase.auth.getUser();

    //         if (error) {
    //             console.error('Error fetching user data:', error);
    //         } else if (user) {
    //             setUserData({
    //                 avatar_url: user.user_metadata.avatar_url || '',
    //                 name: user.user_metadata.name || 'User'
    //             });
    //         }
    //     };


    //     fetchUserData()
    // }, [])


    return (
        <>



                <div className="flex text-xl font-black text-neutral-500 text-center max-w-md mx-auto pb-4">

                    <div>
              {formattedDate}
                    </div>

                </div>

      


        </>
    )
}

