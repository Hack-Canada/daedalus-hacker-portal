"use client";

import { useEffect, useState } from "react";

export const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 5000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent max-sm:text-center sm:w-fit">
      <h1 className="font-rubik text-3xl font-bold sm:text-4xl xl:text-5xl">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
      </h1>
      <p className="text-textMuted sm:text-lg">till Hack Canada 2025</p>
    </div>
  );
};
