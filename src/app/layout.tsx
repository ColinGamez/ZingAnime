import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SessionProvider from "@/components/SessionProvider";
import { ToastProvider } from "@/ui/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZingAnime - Your Gateway to Anime & Asian Media",
  description: "Discover anime, K-dramas, C-dramas, and J-dramas. Track your watchlist and stream your favorite content.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>
          <ToastProvider>
            <Navigation />
            <main className="flex-1">{children}</main>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
