
export const Modal = ({ children, onClose, isOpen }:
    { children: React.ReactNode, onClose: () => void, isOpen: boolean }) => {
    if (!isOpen) return null


    return (
        <>
            <div className="inset-0 fixed flex items-center justify-center backdrop-blur-sm z-50" onClick={() => { onClose() }} >

                <div onClick={(e) => e.stopPropagation()} className="p-6 component-bg">

                        {children}

                </div>

            </div>
        </>
    )
}