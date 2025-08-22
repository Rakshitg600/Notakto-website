'use client'
import { useEffect, useRef } from 'react';

// Components
import Menu from './Menu';

import { useCoins, useUser, useXP, useMute } from '../services/store';
import { initBackgroundMusic, toggleBackgroundMusic, stopBackgroundMusic } from '../services/sounds';

// Firebase module
import { onAuthStateChangedListener, saveEconomyToFirestore, loadEconomyFromFirestore } from '../services/firebase';

export default function Home() {
  const mute = useMute((state) => state.mute);

  const coins = useCoins((state) => state.coins);
  const setCoins = useCoins((state) => state.setCoins);

  const XP = useXP((state) => state.XP);
  const setXP = useXP((state) => state.setXP);

  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const dataLoadedRef = useRef(false); // avoid triggering saveEconomy on every render

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

  // Load user and economy data
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (usr) => {
      setUser(usr);
      if (usr) {
        const cloudData = await loadEconomyFromFirestore(usr.uid) as { coins?: number; XP?: number };
        if (cloudData) {
          console.log(1);
          setCoins(cloudData.coins ?? 1000);
          setXP(cloudData.XP ?? 0);
        } else {
          console.log(2);
          setCoins(1000);
          setXP(0);
        }
        dataLoadedRef.current = true;
      } else {
        dataLoadedRef.current = false;
      }
    });

    return () => unsubscribe();
  }, []);

  // Save to Firestore only after data is loaded and user exists
  useEffect(() => {
    if (user && dataLoadedRef.current) {
      saveEconomyToFirestore(user.uid, coins, XP);
    }
  }, [coins, XP, user]);

  return (
  <div className="relative min-h-screen flex flex-col">
    {/* 🔹 Background Image */}
    <div className="absolute inset-0 bg-[url('/mainmenubg.jpg')] bg-cover bg-center animate-backgroundMove opacity-20"></div>

    {/* 🔹 Foreground Content */}
    <div className="relative z-10 flex-1 flex flex-col">
      <Menu />
    </div>
  </div>
);

}