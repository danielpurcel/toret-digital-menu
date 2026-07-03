import { useState, useEffect } from "react";

export interface OpenStatus {
  isOpen: boolean;
  closesAt: string; // "20:00" or "" if closed
  reopensAt: string; // "domani alle 7:00", "lunedì alle 7:00", etc.
}

function getStatus(now: Date): OpenStatus {
  const day = now.getDay(); // 0=Sun
  const hour = now.getHours();
  const min = now.getMinutes();
  const time = hour + min / 60;

  // Sunday — closed
  if (day === 0) {
    return { isOpen: false, closesAt: "", reopensAt: "lunedì alle 7:00" };
  }

  const openAt = 7;
  let closeAt = day === 4 ? 15 : 20; // Thursday closes at 15

  const isOpen = time >= openAt && time < closeAt;
  const closesAt = `${closeAt.toString().padStart(2, "0")}:00`;

  let reopensAt = "";
  if (!isOpen) {
    if (day === 4 && time >= 15) reopensAt = "venerdì alle 7:00";
    else if (day === 6 && time >= 20) reopensAt = "lunedì alle 7:00";
    else reopensAt = "domani alle 7:00";
  }

  return { isOpen, closesAt, reopensAt };
}

export function useIsOpen(): OpenStatus {
  const [status, setStatus] = useState(() => getStatus(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getStatus(new Date()));
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
