import { TellAbout } from "~/features/tell-about";
import close from "~/shared/assets/icons/svg/close.svg";
import { FortuneWheel } from "~/widgets/fortune-wheel";
import { QuestsList } from "~/widgets/quests-list";

export const Welcome = () => {
  return (
    <main className="py-10 flex flex-col gap-8">
      <h1 className="text-[44px] font-second text-contrast text-center">
        АККАУНТ
      </h1>
      <div className="flex items-center justify-between">
        <h2 className="text-[44px] font-second text-contrast">Квесты</h2>
        <button className="size-11">
          <img src={close} alt="close" />
        </button>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <FortuneWheel />
        <TellAbout />
      </div>
      <QuestsList />
    </main>
  );
};
