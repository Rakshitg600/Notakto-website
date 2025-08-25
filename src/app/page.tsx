'use client'
import { useEffect, useRef } from 'react';

// Components
import Menu from '@/app/Menu';

import { useUser, useMute } from '@/services/store';
import { initBackgroundMusic, toggleBackgroundMusic, stopBackgroundMusic } from '@/services/sounds';

// Firebase module
import { onAuthStateChangedListener } from '@/services/firebase';

export default function Home() {
  const mute = useMute((state) => state.mute);
  const setUser = useUser((state) => state.setUser);
  // Init music
  useEffect(() => {
    initBackgroundMusic(mute);
    return () => {
      stopBackgroundMusic();
    };
  }, []);

  // Toggle mute state
  useEffect(() => {
    toggleBackgroundMusic(mute);
  }, [mute]);

  // Load user
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (usr) => {
      setUser(usr);
    });

    return () => unsubscribe();
  }, []);


  return (
    <div className="flex-1 bg-gray-100">
      <Menu />
    </div>
  );
}