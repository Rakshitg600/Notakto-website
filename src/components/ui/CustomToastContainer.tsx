'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VT323 } from "next/font/google";

const vt323 = VT323({
    weight: "400",
    subsets: ["latin"],
});


function CustomCloseButton({ closeToast }: any) {
    // even tho the react-toastify has its own features --- we cant customise it to our retro style needs
    return (
        <button
            onClick={closeToast} //. react-toastify closeToast function
            className="text-white hover:text-cyan-200 transition-colors"
        >
            ✖
        </button>
    );
}

export default function CustomToastContainer({ autoClose = 4000 }: { autoClose?: number }) {
    return (
        <ToastContainer
            position="top-center"
            autoClose={autoClose}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={true}
            pauseOnHover={false}
            closeButton={CustomCloseButton}
            toastClassName="!w-[350px] !bg-black !text-white border border-cyan-400 rounded-lg !px-4 !py-3 !font-mono !text-xl !text-center flex items-center justify-between shadow-cyan-400 !shadow-lg !tracking-widest !mb-3 !pb-2 !relative" // This forces the properties on the existing tailwind classes 
        //progressClassName="bg-cyan-400 absolute bottom-0 left-0 h-1"
        />
    );
}
