import type { ReactNode } from "react";

export function CategoryPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-500">
      {children}
    </span>
  );
}
