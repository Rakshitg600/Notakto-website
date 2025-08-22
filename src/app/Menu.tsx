'use client'

import { useRouter } from 'next/navigation';
import { signInWithGoogle, signOutUser } from '@/services/firebase';
import { useCoins, useXP, useUser, useMute, useTut } from '@/services/store';
import TutorialModal from '../modals/TutorialModal';
import { toast } from "react-toastify";
import { useRef } from "react";

const Menu = () => {
  const setCoins = useCoins((state) => state.setCoins);
  const setXP = useXP((state) => state.setXP);

  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  const mute = useMute((state) => state.mute);
  const setMute = useMute((state) => state.setMute);
  const showTut = useTut((state) => state.showTut);
  const setShowTut = useTut((state) => state.setShowTut);

  const router = useRouter();

  const lastToastTimeRef = useRef(0);
  const toastCooldown = 4500;

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setCoins(1000);
      setXP(0);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const startGame = (mode: string) => {
    if ((mode === 'liveMatch' || mode === 'vsComputer') && !user) {
      const now = Date.now();
      if (now - lastToastTimeRef.current >= toastCooldown) {
        toast("Please sign in!", { autoClose: 5000 });
        lastToastTimeRef.current = now;
      }
      return;
    }
    router.push(`/${mode}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* 🔹 ANIMATED BACKGROUND */}
      <div
  className="absolute inset-0 bg-[url('/mainbg.gif')] bg-contain bg-center brightness-110 animate-backgroundMove"
 style={{ imageRendering: 'crisp-edges',   // keeps it sharp
    backgroundSize: '100% 100%',     // forces exact fit, no stretch blur
    backgroundRepeat: 'no-repeat' }}

></div>


      {/* 🔹 MENU BOX */}
      <div className="relative bg-black/70 border-4 border-pink-500 shadow-[4px_4px_0px_0px_#000] px-8 py-6 w-full max-w-md flex flex-col items-center gap-5">
        
        <h1 className="text-red-500 text-[48px] font-bold drop-shadow-[3px_3px_0px_#000] uppercase">
          Notakto
        </h1>

        <button onClick={() => startGame('vsPlayer')} className="retro-btn">
          ▶ Player vs Player
        </button>

        <button onClick={() => startGame('vsComputer')} className="retro-btn">
          💻 Player vs Computer
        </button>

        <button onClick={() => startGame('liveMatch')} className="retro-btn">
          🌐 Live Match
        </button>

        <button onClick={() => setShowTut(true)} className="retro-btn">
          📖 Tutorial
        </button>

        {user ? (
          <button onClick={handleSignOut} className="retro-btn">
            🚪 Sign Out
          </button>
        ) : (
          <button onClick={handleSignIn} className="retro-btn">
            🔑 Sign In
          </button>
        )}

        <button onClick={() => setMute(!mute)} className="retro-btn">
          🎵 Sound: {mute ? 'Off' : 'On'}
        </button>

        {showTut && <TutorialModal />}
      </div>
    </div>
  );
};

export default Menu;
