"use client";

import { useEffect, useState } from "react";

export type ToastMessage = { title: string; description?: string };

let toastCallback: ((msg: ToastMessage) => void) | null = null;

export function useToast() {
  return {
    toast: (msg: ToastMessage) => {
      if (toastCallback) toastCallback(msg);
    },
  };
}

export function ToastProvider() {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    toastCallback = setToast;
    return () => {
      toastCallback = null;
    };
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] animate-slide-in-up panel-glass rounded-xl px-5 py-4 max-w-xs shadow-xl">
      <div className="font-display text-sm tracking-wider text-primary">{toast.title}</div>
      {toast.description && (
        <div className="text-xs text-muted-foreground mt-1">{toast.description}</div>
      )}
    </div>
  );
}
