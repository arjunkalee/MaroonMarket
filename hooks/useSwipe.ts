"use client";

import { useCallback, useRef, useState } from "react";

const SWIPE_THRESHOLD_PX = 80;
const SWIPE_THRESHOLD_RATIO = 0.2;

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  thresholdPx?: number;
  thresholdRatio?: number;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  thresholdPx = SWIPE_THRESHOLD_PX,
  thresholdRatio = SWIPE_THRESHOLD_RATIO,
}: UseSwipeOptions) {
  const [dragX, setDragX] = useState(0);
  const startX = useRef(0);
  const containerWidth = useRef(0);
  const currentX = useRef(0);

  const handleStart = useCallback((clientX: number, width: number) => {
    startX.current = clientX;
    containerWidth.current = width;
    currentX.current = clientX;
    setDragX(0);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    const delta = clientX - startX.current;
    const maxDrag = containerWidth.current * 0.45;
    const clamped = Math.max(-maxDrag, Math.min(maxDrag, delta));
    currentX.current = clientX;
    setDragX(clamped);
  }, []);

  const handleEnd = useCallback(() => {
    const delta = currentX.current - startX.current;
    const threshold = Math.max(
      thresholdPx,
      (containerWidth.current || 400) * thresholdRatio
    );
    if (delta > threshold) {
      onSwipeRight?.();
    } else if (delta < -threshold) {
      onSwipeLeft?.();
    }
    setDragX(0);
  }, [onSwipeLeft, onSwipeRight, thresholdPx, thresholdRatio]);

  return { dragX, handleStart, handleMove, handleEnd };
}
