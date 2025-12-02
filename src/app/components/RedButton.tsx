'use client'
import { createClient } from '@/utils/supabase/client'
import { useTextAreaStore } from '../store/textAreaStore';
import { useQueryClient } from '@tanstack/react-query';
import { useNewEntryStore } from '../store/newEntryStore';
import confetti from 'canvas-confetti'
import { useState } from 'react';

export default function RedButton() {
    const { value } = useTextAreaStore()
    const queryClient = useQueryClient()
    // const {setModalOpen} = useModalStore()
    const { setNewEntryOpen } = useNewEntryStore()
    const [isLoading, setIsLoading] = useState(false)
    const spinner = (        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="50" 
        height="200" 
        viewBox="0 0 25 25"
      >
        <g>
          <path 
            fill="currentColor"
            d="M4.254 19.567c.307-.982.77-2.364 1.391-4.362c2.707-.429 3.827.341 5.546-2.729c-1.395.427-3.077-.792-2.987-1.321c.091-.528 3.913.381 6.416-3.173c-3.155.696-4.164-.836-3.757-1.067c.939-.534 3.726-.222 5.212-1.669c.766-.745 1.125-2.556.813-3.202c-.374-.781-2.656-1.946-3.914-1.836c-1.258.109-3.231 4.79-3.817 4.754c-.584-.037-.703-2.098.319-4.013c-1.077.477-3.051 1.959-3.67 3.226c-1.153 2.357.108 7.766-.296 7.958c-.405.193-1.766-2.481-2.172-3.694c-.555 1.859-.568 3.721 1.053 6.194c-.611 1.623-.945 3.491-.996 4.441c-.024.759.724.922.859.493z"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 1.25,0; 2.5,0; 3.75,0; 5,0"
              dur="2s"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 10 10; -15 10 10; 0 10 10; 15 10 10; 0 10 10"
              dur="0.5s"
              repeatCount="indefinite"
              additive="sum"
            />
          </path>
        </g>
      </svg>)

    const wordCounter = () => {
        const words = value.trim().split(/\s+/).filter(word => word.replace(/[^\p{L}\p{N}]/gu, '').length > 0)
        if (value === '') { return 0 }
        else { return words.length }
    }

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            const supabase = await createClient();
            const user = await supabase.auth.getUser();
            const userId = user?.data?.user?.id;

            if (!userId) {
                console.log('User not authenticated')
                return;
            }

            const res = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: value, userId }),
            });

            if (res.ok) {
                queryClient.invalidateQueries({ queryKey: ['notes'] })
                queryClient.invalidateQueries({ queryKey: ['streaks'] })
                queryClient.invalidateQueries({ queryKey: ['weekTracker'] })
                confetti()
                setNewEntryOpen(false)
                // setModalOpen(true)

            } else {
                const errorData = await res.json();
                console.log(errorData)
            }
        } finally {
            setIsLoading(false)
        }
    };

    const buttonColor = () => {
        const baseStyle = 'flex w-[65px] h-[65px] rounded-full items-center justify-center mb-8 text-xl font-bold text-white/70'
        return wordCounter() < 100 ? baseStyle + ' bg-neutral-700' : baseStyle + ' bg-red-700 transition-all'
    }

    return (
        <button
            onClick={handleSubmit}
            disabled={wordCounter() < 100}
            className={buttonColor()}
        >
            { isLoading ? spinner : wordCounter()}
        </button>

    )
}