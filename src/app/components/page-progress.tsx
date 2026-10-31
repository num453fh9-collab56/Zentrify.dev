"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export function PageProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(pathname);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      setVisible(true);
      setProgress(100);
      prevPath.current = pathname;
      timer.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);
    }
    return () => clearTimeout(timer.current);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[3px]">
      <div
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 8px var(--primary), 0 0 2px var(--primary)",
        }}
      />
    </div>
  );
}
