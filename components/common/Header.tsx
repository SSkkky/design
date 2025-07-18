"use client";

import LogoComponent from "./Logo";
import { useRef, useEffect, useState } from "react";
import { useSectionRefs } from "@/context/SectionRefContext";
import PublishIcon from '@mui/icons-material/Publish';
import CommitIcon from '@mui/icons-material/Commit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dataJson from '@/app/assets/data.json';

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
  const [projectData, setProjectData] = useState<any>(null);
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

    // S : 현재 프로젝트 데이터 추출
    const project = segments[1];
    console.log(project)
    console.log(dataJson)
    const nowData = dataJson.find((el)=>el.slug === project);
    nowData && setProjectData(nowData);
    // E : 현재 프로젝트 데이터 추출

    return () => observer.disconnect();
  }, [pathname]); 

  const clickLinkButtonHandler = (key:string) => {
    switch (key) {
      case 'github':
        window.open(projectData?.github);
        break;
        
      case 'website':
        window.open(projectData?.website);
        break;
        
      case 'back':
        router.back();
        break;

      case 'logo':
        router.push("/");
        break;
    
      default:
        return null;
        break;
    }
  }

  const buttonStyle = "w-[48px] h-[48px] transition rounded-full cursor-pointer max-md:w-[36px] max-md:h-[36px] max-sm:w-[28px] max-sm:h-[28px] max-sm:text-sm hover:bg-gray-100";

  const renderRightContent = () => {
    if (segments[0] === "projects") {
      return <>
      <button className={buttonStyle} onClick={()=>clickLinkButtonHandler('github')}><CommitIcon/></button>
      <button className={buttonStyle} onClick={()=>clickLinkButtonHandler('website')}><PublishIcon/></button>
      <button className={buttonStyle} onClick={()=>clickLinkButtonHandler('back')}><ArrowBackIcon/></button>
      </>;
    } else if (segments[0] === "introduce") {
      return <span className="text-sm">👤 자기소개 보기</span>;
    } else if (!segments.length) {
      return (
        <a href="mailto:sonhaneul96@gmail.com" className="p-4">
          <span className=" max-md:hidden hover:text-gray-500 transition">sonhaneul96@gmail.com</span>
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
      return <p>{projectData?.title}</p>;
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
    <header className="fixed flex items-center top-0 left-0 w-full h-[64px] text-black z-1000 font-bold backdrop-blur-sm text-xl md:text-2xl transform-gpu bg-white/30 whitespace-nowrap">
      <LogoComponent clickLogoHandler={()=>clickLinkButtonHandler('logo')} />
      <div className="p-4">
        {renderCenterContent()}
      </div>
      <div className="flex justify-end flex-1 gap-2 text-right text-black p-4">
        {renderRightContent()}
      </div>
    </header>
  );
}
