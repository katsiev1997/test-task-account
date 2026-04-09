import React from "react";
import { cn } from "../lib/utils";

type StatusBadgeProps = {
  status: "available" | "unavailable";
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusText = status === "available" ? "Доступен" : "Выполнен";

  return (
    <div
      className={cn(
        "py-0.5 px-2 w-[76px] h-6 flex items-center justify-center",
        {
          "bg-accent-primary shadow-[0_4px_4px_0_rgba(0,0,0,0.3),0_8px_12px_6px_rgba(0,0,0,0.15)]":
            status === "available",
          "bg-contrast": status === "unavailable",
        },
      )}
    >
      <span
        className={cn("font-family text-xl leading-[100%]", {
          "text-contrast": status === "available",
          "text-[#1e2025]": status === "unavailable",
        })}
      >
        {statusText}
      </span>
    </div>
  );
};
