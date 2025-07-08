import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import { SectionRefProvider } from "@/context/SectionRefContext";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

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
        <SectionRefProvider>
          <div className="min-h-screen bg-white text-black">
            <Header />
            {children}
            <Footer />
          </div>
        </SectionRefProvider>
      </body>
    </html>
  );
}
