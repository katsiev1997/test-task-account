import type { CarouselApi } from "~/shared/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/shared/components/ui/carousel";
import { cards } from "../model/consts/cards";

export const FortuneCarousel = ({
  setApi,
}: {
  setApi: (api: CarouselApi) => void;
}) => (
  <div className="relative">
    <Carousel opts={{ loop: true }} className="w-full" setApi={setApi}>
      <CarouselContent>
        {cards.map((item) => (
          <CarouselItem key={item.id} className="basis-[120px] mr-1">
            <div className="-ml-1 w-[120px] py-4 h-[208px] flex flex-col items-center">
              <h5 className="font-semibold font-family text-additional-grey-1 text-2xl leading-[100%] uppercase">
                {item.title}
              </h5>
              <img src={item.image} alt={item.title} className="w-[120px] h-[120px]" />
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
);
