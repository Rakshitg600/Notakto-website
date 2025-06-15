'use client'

import { useRouter } from 'next/navigation';
import { signInWithGoogle, signOutUser } from '@/services/firebase';

import { useCoins, useXP, useUser, useMute, useTut } from '@/services/store';
import TutorialModal from '../modals/TutorialModal';

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
    router.push(`/${mode}`);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 w-full max-w-md px-4">
        <h1 className="text-white text-[80px]">Notakto</h1>

        <button onClick={() => startGame('vsPlayer')} className="w-full bg-blue-600 py-4 text-white text-2xl ">
          Play vs Player
        </button>

        <button onClick={() => startGame('vsComputer')} className="w-full bg-blue-600 py-4 text-white text-2xl ">
          Play vs Computer
        </button>

        <button onClick={() => startGame('liveMatch')} className="w-full bg-blue-600 py-4 text-white text-2xl ">
          Live Match
        </button>

        <button onClick={() => setShowTut(true)} className="w-full bg-blue-600 py-4 text-white text-2xl ">
          Tutorial
        </button>

        {user ? (
          <button onClick={handleSignOut} className="w-full bg-blue-600 py-4 text-white text-2xl ">
            Sign Out
          </button>
        ) : (
          <button onClick={handleSignIn} className="w-full bg-blue-600 py-4 text-white text-2xl">
            Sign In
          </button>
        )}

        <button onClick={() => setMute(!mute)} className="w-full bg-blue-600 py-4 text-white text-[30px]">
          Sound: {mute ? 'Off' : 'On'}
        </button>
        {showTut && <TutorialModal />}
      </div>
    </div>
  );
};

export default Menu;