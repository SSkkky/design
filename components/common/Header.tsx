"use client";

import LogoComponent from "./Logo";
import { useRef, useEffect, useState } from "react";
import { useSectionRefs } from "@/context/SectionRefContext";
import {
  useRouter,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { sectionRefs } = useSectionRefs();
  const sectionIds = ["INTRO", "ABOUT", "PROJECTS"];
  const [activeSection, setActiveSection] = useState("INTRO");
  const [onMouse, setOnMouse] = useState(false);
  const [isMainPage, setIsMainPage] = useState(true);
  const segments = useSelectedLayoutSegments(); // ex: [ "projects", "map" ]

  // S : 해당 섹션으로 스크롤 이동
  const scrollToSection = (id: string) => {
    const idx = sectionIds.indexOf(id);
    const el = sectionRefs.current[idx];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  // E : 해당 섹션으로 스크롤 이동

  useEffect(() => {
    // S : 섹션 위치 확인용 옵저버
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (idx !== -1) {
              setActiveSection(sectionIds[idx]);
            }
          }
        });
      },
      { threshold: 0.6 }
    );
    // E : 섹션 위치 확인용 옵저버

    sectionRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  const clickLogoHandler = () => {
    router.push("/");
  };

  const renderRightContent = () => {
    if (segments[0] === "projects") {
      return <button
        onClick={()=> clickBackButtonHandler()}
        className={`relative w-[48px] h-[48px] text-black transition duration-200 rounded-full
    ${onMouse ? "bg-white/100" : "bg-white/0"}`}
        onMouseEnter={() => setOnMouse(true)}
        onMouseLeave={() => setOnMouse(false)}
      >
        ←
      </button>;
    } else if (segments[0] === "introduce") {
      return <span className="text-sm">👤 자기소개 보기</span>;
    } else if (!segments.length) {
      return (
        <a href="mailto:sonhaneul96@gmail.com" className="p-4">
          sonhaneul96@gmail.com
        </a>
      );
    }
    return null;
  };

  const clickBackButtonHandler = () => {
    router.back();
  }

  const renderCenterContent = () => {
    if (segments[0] === "projects") {
      return null;
    } else if (!segments.length) {
      return (
        <ul className="flex gap-4">
          {sectionIds.map((item: string, index: number) => (
            <li
              key={index}
              className={`text-gray-400 transition-all duration-500 ease-in-out text-sm sm:text-base  md:text-xl ${
                item === activeSection ? "text-black!" : ""
              }`}
            >
              <button
                className="cursor-pointer"
                onClick={() => scrollToSection(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <header className="fixed flex items-center top-0 left-0 w-full h-[64px] text-black z-1000 font-bold backdrop-blur-sm text-xl md:text-2xl transform-gpu bg-white/30">
      <LogoComponent clickLogoHandler={clickLogoHandler} />
      <div className="p-4">
        {renderCenterContent()}
      </div>
      <div className="flex-1 text-right text-black max-md:hidden p-4">
        {renderRightContent()}
      </div>
    </header>
  );
}
