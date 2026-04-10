import { Confetti } from "@neoconfetti/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/shared/components/ui/button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/shared/components/ui/carousel";
import { Dialog, DialogContent } from "~/shared/components/ui/dialog";
import { Drawer, DrawerContent } from "~/shared/components/ui/drawer";
import { cards } from "../model/consts/cards";

import gift from "~/shared/assets/icons/svg/gift.svg";
import circle from "~/shared/assets/images/circle.png";
import { useIsMobile } from "~/shared/hooks/use-is-mobile";
import { cn } from "~/shared/lib/utils";

export const CarouselFortune = () => {
  type Card = (typeof cards)[number];

  const [api, setApi] = useState<CarouselApi>();
  const [isSpinning, setIsSpinning] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [winningCard, setWinningCard] = useState<Card | null>(null);
  const [cooldownEndAt, setCooldownEndAt] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const isMobile = useIsMobile();
  const spinIntervalRef = useRef<number | null>(null);
  const stopTimeoutRef = useRef<number | null>(null);
  const burstTimeoutRef = useRef<number | null>(null);

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
  };

  const formatTwoDigits = (value: number) => value.toString().padStart(2, "0");

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

    const randomIntervalMs = Math.floor(Math.random() * 46) + 60; // 60..105ms
    const randomDurationMs = Math.floor(Math.random() * 2001) + 2500; // 2500..4500ms

    spinIntervalRef.current = window.setInterval(() => {
      api.scrollNext();
    }, randomIntervalMs);

    stopTimeoutRef.current = window.setTimeout(() => {
      clearSpinTimers();
      setIsSpinning(false);
      triggerBurst();
      setCooldownEndAt(Date.now() + 24 * 60 * 60 * 1000);
      const resultCard = getWinningCard();
      if (resultCard) {
        setWinningCard(resultCard);
        setIsResultOpen(true);
      }
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

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;
  const isCooldownActive = remainingSeconds > 0;

  const { title, description, image } = winningCard || {};

  const resultContent = winningCard ? (
    <div className="flex flex-col items-center gap-6">
      <h2 className="font-semibold text-[44px] font-family text-contrast leading-[100%] uppercase">
        Поздравляем! <br /> Вы выиграли
      </h2>
      <div className="flex items-center justify-center">
        <p className="text-2xl font-semibold font-family text-contrast leading-[100%] uppercase">
          {title}
        </p>
        <img src={image} alt={title} className="" />
        <p className="font-second text-[32px] text-contrast leading-[100%]">
          {description}
        </p>
      </div>
      <p className="font-semibold font-family text-contrast leading-[100%] text-2xl">
        Активируйте в течение 24 часов
      </p>
      <Button
        variant="primary"
        className="h-12 w-full text-[32px] uppercase font-family font-semibold leading-[100%] rounded-full"
        onClick={() => setIsResultOpen(false)}
      >
        Продолжить
      </Button>
    </div>
  ) : null;

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[32px] font-family text-contrast leading-[100%]">
            Колесо Фортуны{" "}
          </h3>
          <p className="text-xl text-additional-grey-1 leading-[100%]">
            Испытайте удачу раз в день <br /> и выигрывайте бонусы для VPN!
          </p>
        </div>
        <div className="relative">
          <img src={circle} alt="circle" className="size-18" />
          {showBurst && (
            <div
              key={burstKey}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Confetti
                particleCount={28}
                force={0.75}
                colors={["#FFFFFF", "#EF4444", "#2563EB"]}
              />
            </div>
          )}
        </div>
      </div>
      {isCooldownActive ? (
        <div className="mt-2 flex items-start gap-3">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              {formatTwoDigits(hours)
                .split("")
                .map((digit, index) => (
                  <div
                    key={`hours-${index}`}
                    className="flex h-[60px] w-[39px] items-center justify-center rounded-[4px] border border-contrast text-[44px] leading-[100%] font-second text-contrast"
                  >
                    {digit}
                  </div>
                ))}
            </div>
            <span className="text-xl leading-[100%] font-second text-additional-grey-1">
              Часы
            </span>
          </div>
          <div className="flex h-[60px] items-center text-additional-grey-1">
            <span className="text-[44px] leading-[100%] font-second">:</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              {formatTwoDigits(minutes)
                .split("")
                .map((digit, index) => (
                  <div
                    key={`minutes-${index}`}
                    className="flex h-[60px] w-[39px] items-center justify-center rounded-[4px] border border-contrast text-[44px] leading-[100%] font-second text-contrast"
                  >
                    {digit}
                  </div>
                ))}
            </div>
            <span className="text-xl leading-[100%] font-second text-additional-grey-1">
              Минуты
            </span>
          </div>
          <div className="flex h-[60px] items-center text-additional-grey-1">
            <span className="text-[44px] leading-[100%] font-second">:</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              {formatTwoDigits(seconds)
                .split("")
                .map((digit, index) => (
                  <div
                    key={`seconds-${index}`}
                    className="flex h-[60px] w-[39px] items-center justify-center rounded-[4px] border border-contrast text-[44px] leading-[100%] font-second text-contrast"
                  >
                    {digit}
                  </div>
                ))}
            </div>
            <span className="text-xl leading-[100%] font-second text-additional-grey-1">
              Секунды
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="relative">
            <Carousel opts={{ loop: true }} className="w-full" setApi={setApi}>
              <CarouselContent>
                {cards.map((item) => (
                  <CarouselItem key={item.id} className="basis-[120px] mr-1">
                    <div className="-ml-1 w-[120px] py-4 h-[208px] flex flex-col items-center">
                      <h5 className="font-semibold font-family text-additional-grey-1 text-2xl leading-[100%] uppercase">
                        {item.title}
                      </h5>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-[120px] h-[120px]"
                      />
                      <p className="text-xl text-additional-grey-1 text-[32px] font-second leading-[100%]">
                        {item.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[208px] w-[120px] -translate-x-1/2 -translate-y-1/2">
              <div className="h-full w-full rounded-[14px] border-2 border-[#ff003d]" />
              <div className="absolute bottom-[2px] left-1/2 h-0 w-0 -translate-x-1/2 border-r-12 border-b-24 border-l-12 border-l-transparent border-r-transparent border-b-[#ff003d]" />
            </div>
          </div>
          <Button
            variant="primary"
            className="gap-4 h-10 cursor-pointer"
            onClick={handleSpin}
            disabled={isSpinning}
          >
            <span className="text-2xl font-semibold uppercase font-family text-contrast leading-[100%]">
              Испытать удачу
            </span>
            <img src={gift} alt="gift" className="size-6" />
          </Button>
        </>
      )}

      {isMobile ? (
        <Drawer open={isResultOpen} onOpenChange={setIsResultOpen}>
          <DrawerContent className="bg-[#1e2025] border-none py-8 px-6">
            {resultContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
          <DialogContent
            showCloseButton={false}
            className={cn(
              "bg-[#1e2025] rounded-[28px] w-[476px] py-8 px-6",
              "shadow-[0_4px_4px_0_rgba(0,0,0,0.3),0_8px_12px_6px_rgba(0,0,0,0.15)]",
            )}
          >
            {resultContent}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
