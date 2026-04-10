import { Confetti } from "@neoconfetti/react";
import { useState } from "react";
import { Button } from "~/shared/components/ui/button";
import type { CarouselApi } from "~/shared/components/ui/carousel";
import gift from "~/shared/assets/icons/svg/gift.svg";
import circle from "~/shared/assets/images/circle.png";
import { useFortuneSpin } from "../model/hooks/use-fortune-spin";
import { CooldownTimer } from "./cooldown-timer";
import { FortuneCarousel } from "./fortune-carousel";
import { FortuneResultModal } from "./fortune-result-modal";

export const CarouselFortune = () => {
  const [api, setApi] = useState<CarouselApi>();
  const {
    burstKey,
    handleSpin,
    isCooldownActive,
    isResultOpen,
    isSpinning,
    remainingSeconds,
    setIsResultOpen,
    showBurst,
    winningCard,
  } = useFortuneSpin(api);

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
        <CooldownTimer remainingSeconds={remainingSeconds} />
      ) : (
        <>
          <FortuneCarousel setApi={setApi} />
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
      <FortuneResultModal
        isOpen={isResultOpen}
        onOpenChange={setIsResultOpen}
        winningCard={winningCard}
      />
    </>
  );
};
