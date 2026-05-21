// useScenePlayer.js — Hook para controle de cenas animadas
import { useState, useEffect, useCallback, useRef } from 'react';

export function useScenePlayer(totalScenes, { autoAdvance = true, sceneDuration = 3000 } = {}) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goToScene = useCallback((index) => {
    const clamped = Math.max(0, Math.min(totalScenes - 1, index));
    setCurrentScene(clamped);
  }, [totalScenes]);

  const nextScene = useCallback(() => {
    setCurrentScene(prev => {
      if (prev >= totalScenes - 1) {
        if (autoAdvance) {
          setIsPlaying(false);
          return prev;
        }
        return 0; // loop
      }
      return prev + 1;
    });
  }, [totalScenes, autoAdvance]);

  const prevScene = useCallback(() => {
    setCurrentScene(prev => Math.max(0, prev - 1));
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearTimer();
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setCurrentScene(0);
    setIsPlaying(false);
  }, [clearTimer]);

  const toggle = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  useEffect(() => {
    if (!isPlaying) { clearTimer(); return; }
    timerRef.current = setTimeout(() => {
      setCurrentScene(prev => {
        if (prev >= totalScenes - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, sceneDuration / speed);
    return clearTimer;
  }, [isPlaying, currentScene, totalScenes, sceneDuration, speed, clearTimer]);

  const progress = totalScenes > 1 ? currentScene / (totalScenes - 1) : 0;

  return {
    currentScene,
    isPlaying,
    speed,
    progress,
    totalScenes,
    goToScene,
    nextScene,
    prevScene,
    play,
    pause,
    reset,
    toggle,
    setSpeed,
    isFirst: currentScene === 0,
    isLast: currentScene === totalScenes - 1,
  };
}
