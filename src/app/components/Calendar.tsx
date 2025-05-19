import { eachDayOfInterval, endOfMonth, format, getDate, getDay, isSameDay, isToday, startOfMonth } from "date-fns"


export const Calendar = ({ events }: { events: Array<number> }) => {
    const currentDate = new Date()
    const firstDayOfMonth = startOfMonth(currentDate)
    const lastDayOfMonth = endOfMonth(currentDate)
    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    })

    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    const startingDayIndex = getDay(firstDayOfMonth)



    return (
        <div className="container mx-auto">
            <div className="text-center">

                <h2 className="text-5xl">{format(currentDate, "MMMM")}</h2>

                <div className="grid grid-cols-7 gap-6">

                    {Array.from({ length: startingDayIndex }).map((_, index) => {
                        return <div key={`empty-${index}`} />
                    })}

                    {daysInMonth.map((day, index) => {
                        let dateClasses = ''

                        if (isToday(day)) { dateClasses = 'border-2 border-black rounded-full' }
                        
                        events.map((event)=>{
                            if (getDate(day) === event) { 
                                dateClasses = 'bg-black rounded-full text-white'
                            }
                        })

                        return <div key={index} className={dateClasses}>
                            {format(day, "d")}

                        {/* {events
                        .filter((event)=> getDate(day) === event)
                        .map((event)=>{
                            return <div key={event} className="bg-black" >dw</div>
                        })} */}

                        </div>
                    })}
                </div>

            </div>
        </div>

    )
}