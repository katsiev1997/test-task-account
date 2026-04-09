import { useState } from "react";
import { StatusBadge } from "~/shared/components/status-badge";
import { cn } from "~/shared/lib/utils";
import type { Quest } from "../model/consts/quests";

type QuestCardProps = {
  className?: string;
  quest: Quest;
};

export const QuestCard = ({ quest, className }: QuestCardProps) => {
  const { done, title, description, buttonText, buttonIcon } = quest;
  const [completed, setCompleted] = useState(done);
  return (
    <li
      className={cn(
        "border border-additional-grey-2 rounded-xl px-6 pb-6 flex flex-col gap-4",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="h-[60px] flex flex-col gap-1">
          <StatusBadge status={completed ? "unavailable" : "available"} />
          <h3 className="font-semibold font-family text-contrast text-[32px] leading-[100%] uppercase">
            {title}
          </h3>
        </div>
        <p className="font-family text-additional-grey-1 leading-[100%] text-xl ">
          {description}
        </p>
      </div>
      <button
        onClick={() => setCompleted(true)}
        className="flex justify-center items-center cursor-pointer hover:bg-contrast/80 active:bg-accent-primary transition-colors gap-2 bg-contrast rounded-full h-10 font-semibold font-family text-2xl uppercase text-[#1e2025]"
      >
        {buttonText}
        {buttonIcon && <img src={buttonIcon} alt={buttonText} />}
      </button>
    </li>
  );
};
