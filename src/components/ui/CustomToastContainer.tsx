'use client';

import { ToastContainer, ToastContainerProps, CloseButton } from 'react-toastify';
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
        <ToastContainer
            position={position}
            autoClose={autoClose}
            hideProgressBar={hideProgressBar}
            newestOnTop={newestOnTop}
            closeOnClick={closeOnClick}
            pauseOnFocusLoss={pauseOnFocusLoss}
            draggable={draggable}
            pauseOnHover={pauseOnHover}
            closeButton={(props) => (
                <button
                    onClick={props.closeToast}
                    className={`absolute top-1 right-3 text-white ${vt323.className}`}
                    aria-label="close"
                >
                    X
                </button>
            )}
            toastClassName={() =>
                `${vt323.className} relative text-[22px] text-center w-[300px] 
                 bg-black text-white font-mono border border-blue-500 rounded-md px-4 py-3 
                 shadow-[0_0_12px_#00ffff] tracking-wider mb-6`
            }
            className="pb-2"
            {...rest}
        />
    );
}
