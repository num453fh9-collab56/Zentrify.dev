"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { AuthProvider } from "./auth-provider";
import { ToastProvider } from "./toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </LazyMotion>
  );
}
