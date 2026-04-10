import { useEffect, useRef, useState } from "react";
import type { CarouselApi } from "~/shared/components/ui/carousel";
import { cards } from "../consts/cards";

type Card = (typeof cards)[number];

const COOLDOWN_MS = 24 * 60 * 60 * 1000;
const RESULT_REVEAL_DELAY_MS = 450;

export const useFortuneSpin = (api?: CarouselApi) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [winningCard, setWinningCard] = useState<Card | null>(null);
  const [cooldownEndAt, setCooldownEndAt] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const spinIntervalRef = useRef<number | null>(null);
  const stopTimeoutRef = useRef<number | null>(null);
  const burstTimeoutRef = useRef<number | null>(null);
  const resultRevealTimeoutRef = useRef<number | null>(null);

  const clearSpinTimers = () => {
    if (spinIntervalRef.current !== null) {
      window.clearInterval(spinIntervalRef.current);
      spinIntervalRef.current = null;
    }

    if (stopTimeoutRef.current !== null) {
      window.clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }

    if (burstTimeoutRef.current !== null) {
      window.clearTimeout(burstTimeoutRef.current);
      burstTimeoutRef.current = null;
    }

    if (resultRevealTimeoutRef.current !== null) {
      window.clearTimeout(resultRevealTimeoutRef.current);
      resultRevealTimeoutRef.current = null;
    }
  };

  const triggerBurst = () => {
    setShowBurst(true);
    setBurstKey((prev) => prev + 1);

    if (burstTimeoutRef.current !== null) {
      window.clearTimeout(burstTimeoutRef.current);
    }

    burstTimeoutRef.current = window.setTimeout(() => {
      setShowBurst(false);
      burstTimeoutRef.current = null;
    }, 3000);
  };

  const getWinningCard = () => {
    if (!api) return null;

    const selectedIndex = api.selectedScrollSnap();
    const safeIndex =
      ((selectedIndex % cards.length) + cards.length) % cards.length;

    return cards[safeIndex];
  };

  const handleSpin = () => {
    if (!api || isSpinning) return;

    setIsSpinning(true);
    clearSpinTimers();

    const randomIntervalMs = Math.floor(Math.random() * 46) + 60;
    const randomDurationMs = Math.floor(Math.random() * 2001) + 2500;

    spinIntervalRef.current = window.setInterval(() => {
      api.scrollNext();
    }, randomIntervalMs);

    stopTimeoutRef.current = window.setTimeout(() => {
      clearSpinTimers();
      setIsSpinning(false);
      resultRevealTimeoutRef.current = window.setTimeout(() => {
        triggerBurst();
        setCooldownEndAt(Date.now() + COOLDOWN_MS);
        const resultCard = getWinningCard();
        if (resultCard) {
          setWinningCard(resultCard);
          setIsResultOpen(true);
        }
        resultRevealTimeoutRef.current = null;
      }, RESULT_REVEAL_DELAY_MS);
    }, randomDurationMs);
  };

  useEffect(() => {
    return () => {
      clearSpinTimers();
    };
  }, []);

  useEffect(() => {
    if (!cooldownEndAt) return;

    const updateRemaining = () => {
      const next = Math.max(0, Math.ceil((cooldownEndAt - Date.now()) / 1000));
      setRemainingSeconds(next);
    };

    updateRemaining();
    const intervalId = window.setInterval(updateRemaining, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [cooldownEndAt]);

  return {
    burstKey,
    handleSpin,
    isCooldownActive: remainingSeconds > 0,
    isResultOpen,
    isSpinning,
    remainingSeconds,
    setIsResultOpen,
    showBurst,
    winningCard,
  };
};
