"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Aside from "@/components/common/Aside";
import SectionIntro from "@/components/SectionIntro";
import SectionAbout from "@/components/SectionAbout";
import SectionProjects from "@/components/SectionProjects";
import ProjectModal from "@/components/ProjectModal";
import { useSelectedLayoutSegments } from "next/navigation";

export default function Home() {
  const segments = useSelectedLayoutSegments();
  const [activeSection, setActiveSection] = useState('INTRO');

  const sectionIds = ['INTRO', 'ABOUT', 'PROJECTS'];
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // 섹션 ref 등록용 함수
  const setRef = (el: HTMLElement | null, index: number) => {
    sectionRefs.current[index] = el;
  };

  // 해당 섹션으로 스크롤 이동
  const scrollToSection = (id: string) => {
    const idx = sectionIds.indexOf(id);
    const el = sectionRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.findIndex(ref => ref === entry.target);
            if (idx !== -1) {
              setActiveSection(sectionIds[idx]);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const props = {sectionIds, activeSection, scrollToSection};

  return (
    <>
      <Header props={props} />

      <div ref={el => setRef(el, 0)}>
        <SectionIntro />
      </div>

      <div ref={el => setRef(el, 1)}>
        <SectionAbout />
      </div>

      <div ref={el => setRef(el, 2)}>
        <SectionProjects />
      </div>

      <Footer />
      {segments[0] === "projects" && segments[1] && <ProjectModal />}
      <Aside activeSection={activeSection} />
    </>
  );
}
