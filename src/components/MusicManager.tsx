'use client'

import { useEffect, useRef } from 'react'
import { initBackgroundMusic, toggleBackgroundMusic } from '@/services/sounds'
import { useMute } from '@/services/store'

export default function MusicManager() {
  const mute = useMute(state => state.mute)
  const initializedRef = useRef(false)

  // initialize once, but don’t auto-play — only prepare
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    // prepare audio but don't play until user interacts
    initBackgroundMusic(mute)

    const unlock = () => {
      const currentMute = useMute.getState().mute
      toggleBackgroundMusic(currentMute) // start or stay muted
      document.removeEventListener('click', unlock)
    }

    document.addEventListener('click', unlock)
    return () => document.removeEventListener('click', unlock)
  }, [])

  // always react to mute changes 
  useEffect(() => {
    toggleBackgroundMusic(mute)
    console.log("Toggle");
    
  }, [mute])

  return null
}
