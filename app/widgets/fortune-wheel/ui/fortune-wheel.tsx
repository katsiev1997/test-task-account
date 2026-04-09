import circle from "~/shared/assets/images/circle.png";
import { CarouselFortune } from "./carousel-fortune";

export const FortuneWheel = () => {
  return (
    <div className="min-w-0 flex-1 md:basis-1/2 rounded-xl border-2 border-additional-grey-2 p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[32px] font-family text-contrast leading-[100%]">
            Колесо Фортуны{" "}
          </h3>
          <p className="text-xl text-additional-grey-1 leading-[100%]">
            Испытайте удачу раз в день <br /> и выигрывайте бонусы для VPN!
          </p>
        </div>
        <img src={circle} alt="circle" className="size-18" />
      </div>
      <CarouselFortune />
      <div className="flex flex-col gap-[10px]">
        <p className="font-family text-contrast text-xl leading-[100%]">
          Крути колесо 7 дней подряд без пропусков и получи на 7-й день
          гарантированный 1 день подписки!
        </p>
        <div className="relative border border-additional-grey-2 rounded-xl py-2 px-4 h-[60px] flex items-center justify-between">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="w-[37.5px] z-10 text-center">
              <span className="text-[44px] font-family font-semibold text-contrast leading-[100%]">
                {index + 1}
              </span>
            </div>
          ))}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[54px] h-4 bg-accent-primary z-0" />
        </div>
      </div>
    </div>
  );
};
