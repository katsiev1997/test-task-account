const formatTwoDigits = (value: number) => value.toString().padStart(2, "0");

const TimerGroup = ({
  value,
  label,
  groupKey,
}: {
  value: number;
  label: string;
  groupKey: "hours" | "minutes" | "seconds";
}) => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex items-center gap-1">
      {formatTwoDigits(value)
        .split("")
        .map((digit, index) => (
          <div
            key={`${groupKey}-${index}`}
            className="flex h-[60px] w-[39px] items-center justify-center rounded-[4px] border border-contrast text-[44px] leading-[100%] font-second text-contrast"
          >
            {digit}
          </div>
        ))}
    </div>
    <span className="text-xl leading-[100%] font-second text-additional-grey-1">
      {label}
    </span>
  </div>
);

const TimerSeparator = () => (
  <div className="flex h-[60px] items-center text-additional-grey-1">
    <span className="text-[80px] leading-[100%] font-second">:</span>
  </div>
);

export const CooldownTimer = ({
  remainingSeconds,
}: {
  remainingSeconds: number;
}) => {
  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  return (
    <div className="mt-2 flex items-start gap-3">
      <TimerGroup value={hours} label="Часы" groupKey="hours" />
      <TimerSeparator />
      <TimerGroup value={minutes} label="Минуты" groupKey="minutes" />
      <TimerSeparator />
      <TimerGroup value={seconds} label="Секунды" groupKey="seconds" />
    </div>
  );
};
