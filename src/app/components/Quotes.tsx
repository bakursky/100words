import { useEffect, useState } from "react"

export default function Quotes() {
    const [ randomNumber, setRandomNumber] = useState<number | undefined>(undefined)

    useEffect(()=>{
        setRandomNumber(Math.floor(Math.random() * 10))
    },[])

    const quotes = [
        {
            author: 'Christina Baldwin',
            quote: '"Journal writing is a voyage to the interior."'
        },
        {
            author: 'William Wordsworth',
            quote: '"Fill your paper with the breathings of your heart."'
        },
        {
            author: 'Ernest Hemingway',
            quote: '"Write hard and clear about what hurts."'
        },
        {
            author: 'Lucy Dacus',
            quote: '"A journal is your completely unaltered voice."'
        },
        {
            author: 'Susan Sontag',
            quote: '"In the journal I do not just express myself… I create myself."'
        },
        {
            author: 'Jack London',
            quote: '"Keep a notebook. Travel with it, eat with it, sleep with it."'
        },
        {
            author: 'Jack London',
            quote: '"Cheap paper is less perishable than gray matter."'
        },
        {
            author: 'Matthew McConaughey',
            quote: '"I never wrote things down to remember; I always wrote things down so I could forget."'
        },
        {
            author: 'J.M. Barrie',
            quote: '"The life of every man is a diary in which he means to write one story, and writes another."'
        },
        {
            author: 'Virginia Woolf',
            quote: '"Writing thus for my own eye only is good practice. It loosens the ligaments."'
        },
    ]

    if (randomNumber === undefined || !quotes[randomNumber]) {
        return null
    }

    return (
        <div className='component-bg p-6  text-neutral-600 font-semibold text-lg flex flex-col items-center text-center gap-2 mb-24 '>
            <div>{quotes[randomNumber].quote}</div>
            <span className='text-sm text-red-700'>{quotes[randomNumber].author}</span>
        </div>
    )
}