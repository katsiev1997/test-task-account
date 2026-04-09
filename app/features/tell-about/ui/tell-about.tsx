import { StatusBadge } from "~/shared/components/status-badge";
import { Button } from "~/shared/components/ui/button";

export const TellAbout = () => {
  return (
    <div className="bg-contrast px-6 pb-6 flex-1 flex flex-col gap-4 md:h-[268px] lg:h-[248px]">
      <div className="flex flex-col gap-2">
        <div className="h-[60px] flex flex-col gap-1">
          <StatusBadge status="available" />
          <h3 className="font-semibold font-family text-[#1e2025] text-[32px] leading-[100%] uppercase">
            Расскажи о Hiro
          </h3>
        </div>
        <p className="font-family text-additional-grey-2 leading-[100%] text-xl ">
          Просто напиши пост/статью о нас в крупном канале или на своей странице
          в соцсетях со ссылкой на нас. <br /> Пришли ссылку на пост/статью — и
          мы начислим тебе от 15 до 90 дней VPN бесплатно! <br />
          Чем больше охват, тем длиннее подарок!
        </p>
      </div>
      <Button
        variant="primary"
        className="w-full uppercase text-contrast text-2xl font-semibold leading-[100%] border-none h-10 cursor-pointer"
      >
        Отправить ссылки
      </Button>
    </div>
  );
};
