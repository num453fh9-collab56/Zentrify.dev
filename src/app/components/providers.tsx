"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { ToastProvider } from "./toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <ToastProvider>{children}</ToastProvider>
    </LazyMotion>
  );
}
