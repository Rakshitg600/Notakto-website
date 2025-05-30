import { create } from 'zustand';

type CoinStore = {
    coins: number;
    setCoins: (newCoins: number) => void;
  };
type XPStore = {
    XP: number;
    setXP: (newXP: number) => void;
  };
type userStore = {
  user: any;
  setUser: (newUser: any) => void;
};
type muteStore = {
    mute: boolean;
    setMute: (newMute: boolean) => void;
  };
type tutStore = {
    showTut: boolean;
    setShowTut: (newShowTut: boolean) => void;
  };





export const useCoins = create<CoinStore>((set) => ({
  coins: 1000,
  setCoins: (newCoins: number) => set({ coins: newCoins }),
}))
export const useXP = create<XPStore>((set) => ({
  XP: 0,
  setXP: (newXP: number) => set({ XP: newXP }),
}))
export const useUser = create<userStore>((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
}));
export const useMute = create<muteStore>((set) => ({
  mute: true,
  setMute: (newMute) => set({ mute: newMute }),
}));
export const useTut = create<tutStore>((set) => ({
  showTut: false,
  setShowTut: (newShowTut) => set({ showTut: newShowTut }),
}));

