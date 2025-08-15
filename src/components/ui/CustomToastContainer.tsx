'use client';

import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VT323 } from "next/font/google";

const vt323 = VT323({
    weight: "400",
    subsets: ["latin"],
});

type CustomToastContainerProps = Omit<ToastContainerProps, 'toastClassName'> & {
    toastClassName?: ToastContainerProps['toastClassName'];
};

export function CustomToastContainer({
    position = "top-center",
    autoClose = 4000,
    hideProgressBar = false,
    newestOnTop = false,
    closeOnClick = false,
    pauseOnFocusLoss = false,
    draggable = true,
    pauseOnHover = true,
    closeButton = false,
    toastClassName,
    ...rest
}: CustomToastContainerProps = {}) {
    return (
        <ToastContainer //many more props available
            position={position}
            autoClose={autoClose}        // Time for which the toast will be visible 
            hideProgressBar={hideProgressBar}  // progress bar for cool down will be hidden
            newestOnTop={newestOnTop}     // older toasts stay on top
            closeOnClick={closeOnClick}    // Closes the toast on click
            pauseOnFocusLoss={pauseOnFocusLoss} // cool down time pauses when tab or window is switched
            draggable={draggable}        // toast can be dragged
            pauseOnHover={pauseOnHover}     // The Toast Notification pauses on hover
            closeButton={closeButton}     // Close (X) button to manually close the toast
            toastClassName={() =>
                `${vt323.className} relative text-[22px] text-center w-[300px] 
                 bg-black text-white font-mono border border-blue-500 rounded-md px-4 py-3 
                 shadow-[0_0_12px_#00ffff] tracking-wider 
                 mb-6` //  mb-6 adds vertical space between different toasts
            }

            className="pb-2" //  ensures no extra gap between content & progress bar
            {...rest} // Spread the rest of the props
        />
    );
}