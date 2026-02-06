import {useEffect } from 'react'

// <!-- Modal toggle -->
// <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
//   Toggle modal
// </button>

// <!-- Main modal -->
const Modal = ({isOpen, onClose, children, form_order}) => {
    useEffect(() => {
        console.log('form_order from modal', form_order)
    }, [form_order.packet])
    if(!isOpen) return null
    return (

    // <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full relative">
        {/* <div className="relative p-4 w-full max-w-md max-h-full"> */}
            {/* <!-- Modal content --> */}
            <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                    <h3 className="text-lg font-medium text-heading">
                        Formulir Pendaftaran
                    </h3>
                    <button type="button" className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal"
                        onClick={onClose}    
                    >
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* <!-- Modal body --> */}
                {children}
            </div>
        </div>
    </div> 
    )

}

export default Modal;
