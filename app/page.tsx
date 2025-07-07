"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Header from "@/components/common/Header";
import Aside from "@/components/common/Aside";
import SectionIntro from "@/components/SectionIntro";
import SectionAbout from "@/components/SectionAbout";
import SectionProjects from "@/components/SectionProjects";
import ProjectModal from "@/components/ProjectModal";
import { useSelectedLayoutSegments } from "next/navigation";
import { deviceUtils } from "./utils/deviceUtils";
import { viewportUtils } from "./utils/viewportUtils";
import SmoothFollower from "@/app/hooks/SmoothFollowerCursor";
import FluidCursor from "@/app/hooks/FluidCursor";

export default function Home() {
  const segments = useSelectedLayoutSegments();
  const [activeSection, setActiveSection] = useState("INTRO");
  const [shouldRender, setShouldRender] = useState(false);

  // S : 해당 섹션으로 스크롤 이동
  const sectionIds = ["INTRO", "ABOUT", "PROJECTS"];
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const setRef = (el: HTMLElement | null, index: number) => {
    // 섹션 ref 등록용 함수
    sectionRefs.current[index] = el;
  };

  const scrollToSection = (id: string) => {
    const idx = sectionIds.indexOf(id);
    const el = sectionRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

    // S : 클라이언트 환경 OS 체크 (*PC이면 커서 이펙트 적용)
    const renderIntroCursor = () => {
      // pc가 아니거나 768px 이상이면 intro에 커서 노출
      const isPCOS = deviceUtils.isPCOS();
      const isWideViewport = viewportUtils.isWideViewport();
      console.log(isPCOS, isWideViewport)
      setShouldRender(isPCOS && isWideViewport);
    };

    renderIntroCursor();
    window.addEventListener("resize", renderIntroCursor);
    // E : 클라이언트 환경 OS 체크 (*PC이면 커서 이펙트 적용)


    return () => {
      if (typeof observer !== "undefined") {
        observer.disconnect();
      }
      window.removeEventListener("resize", renderIntroCursor);
    };
  }, []);

  const props = { sectionIds, activeSection, scrollToSection };
  const introProps = { shouldRender };

  return (
    <>
      <Header props={props} />
      {shouldRender && <SmoothFollower />}

      <div ref={(el) => setRef(el, 0)}>
        <SectionIntro />
      </div>

      <div ref={(el) => setRef(el, 1)}>
        <SectionAbout />
      </div>

      <div ref={(el) => setRef(el, 2)}>
        <SectionProjects />
      </div>
      {segments[0] === "projects" && segments[1] && <ProjectModal />}
      <Aside activeSection={activeSection} />
    </>
  );
}
