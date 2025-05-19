
export const Modal = ({ children, onClose, isOpen }: 
    { children: React.ReactNode, onClose: () => void, isOpen: boolean }) => {
    if (!isOpen) return null


    return (
        <>
            <div className="inset-0 fixed flex items-center justify-center backdrop-blur-sm" onClick={() => { onClose() }} >

                <div onClick={(e) => e.stopPropagation()} className="bg-neutral-800  max-w-md h-auto text-neutral-200 p-6 rounded-lg">  
                    {children}

                {/* <div><button onClick={()=>{onClose()}} className="text-white bg-neutral-900 p-2 rounded-md mt-2  ">Close</button></div> */}

                </div>

            </div>
        </>
    )
}