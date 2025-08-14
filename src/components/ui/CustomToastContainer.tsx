'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VT323 } from "next/font/google";

// Google font import
const vt323 = VT323({
    weight: "400",
    subsets: ["latin"],
});

// Custom Close Button Component
const CloseButton = ({ closeToast }: { closeToast?: () => void }) => (
    <button
        onClick={closeToast}
        style={{
            //Keeping it at top right 
            position: 'absolute',
            right: '8px',
            top: '6px',
            color: 'white',
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            fontWeight: 'bold',
            cursor: 'pointer',
            textShadow: '0 0 5px #00ffff',
        }}
    >
        ×
    </button>
);

export function CustomToastContainer({ autoClose = 4000 }: { autoClose?: number }) {
    return (
        <ToastContainer
            position="top-center"   // shows toast at top-center
            autoClose={autoClose}   // auto close time
            hideProgressBar={false} // keep progress bar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={true}
            pauseOnHover={false}
            closeButton={<CloseButton />} //  Custom close button

            toastClassName={() =>
                `${vt323.className} relative text-[22px] text-center w-[300px] 
                 bg-black text-white font-mono border border-blue-500 rounded-md px-4 py-3 
                 shadow-[0_0_12px_#00ffff] tracking-wider 
                 mb-6` //  mb-6 adds vertical space between different toasts
            }

            className="pb-2" //  ensures no extra gap between content & progress bar
        />
    );
}
