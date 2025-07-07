import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import Footer from "@/components/common/Footer";

const pretendard = localFont({
  src: "../public/assets/fonts/PretendardVariable.woff2",
  weight: "400 900",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Sky Archive",
  description: "화면을 개발하는 손하늘의 포트폴리오 아카이빙 사이트입니다.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kr">
      <body className={`${pretendard.className} font-sans tracking-tight`}>
        <div className="min-h-screen bg-white text-black">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
