import { useEffect, useRef, useState } from "react";
import { Button } from "~/shared/components/ui/button";
import gift from "~/shared/assets/icons/svg/gift.svg";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/shared/components/ui/carousel";

export const CarouselFortune = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [isSpinning, setIsSpinning] = useState(false);
  const spinIntervalRef = useRef<number | null>(null);
  const stopTimeoutRef = useRef<number | null>(null);

  const clearSpinTimers = () => {
    if (spinIntervalRef.current !== null) {
      window.clearInterval(spinIntervalRef.current);
      spinIntervalRef.current = null;
    }

    if (stopTimeoutRef.current !== null) {
      window.clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
  };

  const handleSpin = () => {
    if (!api || isSpinning) return;

    setIsSpinning(true);
    clearSpinTimers();

    const randomIntervalMs = Math.floor(Math.random() * 121) + 80; // 80..200ms
    const randomDurationMs = Math.floor(Math.random() * 2001) + 2500; // 2500..4500ms

    spinIntervalRef.current = window.setInterval(() => {
      api.scrollNext();
    }, randomIntervalMs);

    stopTimeoutRef.current = window.setTimeout(() => {
      clearSpinTimers();
      setIsSpinning(false);
    }, randomDurationMs);
  };

  useEffect(() => {
    return () => {
      clearSpinTimers();
    };
  }, []);

  return (
    <>
      <Carousel opts={{ loop: true }} className="w-full" setApi={setApi}>
        <CarouselContent className="-ml-1">
          <CarouselItem className="basis-[120px] ml-1">
            <div className="w-[120px] h-[208px] bg-accent-primary"></div>
          </CarouselItem>
          <CarouselItem className="basis-[120px] ml-1">
            <div className="w-[120px] h-[208px] bg-accent-primary"></div>
          </CarouselItem>
          <CarouselItem className="basis-[120px] ml-1">
            <div className="w-[120px] h-[208px] bg-accent-primary"></div>
          </CarouselItem>
          <CarouselItem className="basis-[120px] ml-1">
            <div className="w-[120px] h-[208px] bg-accent-primary"></div>
          </CarouselItem>
          <CarouselItem className="basis-[120px] ml-1">
            <div className="w-[120px] h-[208px] bg-accent-primary"></div>
          </CarouselItem>
          <CarouselItem className="basis-[120px] ml-1">
            <div className="w-[120px] h-[208px] bg-accent-primary"></div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
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
  );
};
