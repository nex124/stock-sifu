import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Sifu | Malaysian Market Insights",
  description: "Get real-time Malaysian stock market insights with AI-generated explanations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body suppressHydrationWarning className={`${inter.className} min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}
