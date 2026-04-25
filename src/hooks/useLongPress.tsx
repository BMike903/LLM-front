import { useRef } from "react";
import React from "react";

type TouchHandler = React.TouchEvent<HTMLElement>;

export function useLongPress(callback: (e: TouchHandler) => void, ms = 500) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moved = useRef(false);

  const start = (e: TouchHandler) => {
    moved.current = false;

    timer.current = setTimeout(() => {
      if (!moved.current) {
        callback(e);
      }
    }, ms);
  };

  const move = () => {
    moved.current = true;
    if (timer.current) clearTimeout(timer.current);
  };

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  return {
    onTouchStart: start,
    onTouchEnd: clear,
    onTouchCancel: clear,
    onTouchMove: move,
  };
}
