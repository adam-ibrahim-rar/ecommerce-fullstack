import { useEffect, useState } from "react";

type CountdownProps = {
  endsAt: string;
};

export default function Countdown({ endsAt }: CountdownProps) {
  const calculateTime = () => {
    const difference = new Date(endsAt).getTime() - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calculateTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [endsAt]);

  return (
    <div className="flex items-end gap-3">
      <TimeBox label="Days" value={time.days} />

      <span className="mb-1 text-2xl font-bold text-secondary-two">:</span>

      <TimeBox label="Hours" value={time.hours} />

      <span className="mb-1 text-2xl font-bold text-secondary-two">:</span>

      <TimeBox label="Minutes" value={time.minutes} />

      <span className="mb-1 text-2xl font-bold text-secondary-two">:</span>

      <TimeBox label="Seconds" value={time.seconds} />
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex min-w-[55px] flex-col">
      <span className="text-sm font-medium">{label}</span>

      <span className="text-[32px] font-bold leading-[1.1]">
        {String(value).padStart(2, "0")}
      </span>
    </div>
  );
}
