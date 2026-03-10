import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CursorSystem from "@/components/CursorSystem";
import ThemeToggle from "@/components/ThemeToggle";
import InteractionProtector from "@/components/InteractionProtector";

// Note: Ensure the fonts are imported in your globals.css or here via next/font

export const metadata: Metadata = {
  title: "Plot Armour | Wear Your Plot Armour",
  description: "Every arc needs a survivor. Plot Armour represents resilience, confidence, and individuality through bold streetwear born in New Delhi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden select-none">
        <SmoothScrollProvider>
          <InteractionProtector />
          <CursorSystem />
          <ThemeToggle />
          <main className="min-h-screen">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
