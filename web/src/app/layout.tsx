import type { Metadata } from "next";
import { Suspense } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "La Buena Mesa",
    template: "%s · La Buena Mesa",
  },
  description: "Menús y platillos de La Buena Mesa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className="flex min-h-dvh flex-col bg-stone-50 text-stone-900 antialiased">
        <Suspense
          fallback={
            <div className="h-16 border-b border-stone-200/80 bg-stone-50" />
          }
        >
          <SiteHeader />
        </Suspense>
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
