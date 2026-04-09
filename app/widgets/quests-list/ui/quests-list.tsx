import React from "react";
import { quests } from "../model/consts/quests";
import { QuestCard } from "./quest-card";

export const QuestsList = () => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quests.map((quest) => (
        <QuestCard key={quest.id} quest={quest} />
      ))}
    </ul>
  );
};
