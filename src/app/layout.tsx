import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CursorSystem from "@/components/CursorSystem";
import ThemeToggle from "@/components/ThemeToggle";

// Note: Ensure the fonts are imported in your globals.css or here via next/font

export const metadata: Metadata = {
  title: "BLUORNG Custom Storefront",
  description: "A headless architectural replica of the BLUORNG aesthetic using Next.js and Shopify.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden">
        <SmoothScrollProvider>
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
