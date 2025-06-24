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
  const [isIntro, setIsIntro] = useState<boolean>(false);
  const targetRef = useRef<any>(null);

  useEffect(() => {
    // 현재 intro(ref)가 화면에 보이는지 확인하는 Intersection Observer 설정
    if (typeof window === "undefined") return;
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntro(entry.isIntersecting);
        console.log("isIntro:", entry.isIntersecting);
      },
      {
        threshold: 0.1, // 10%만 보여도 true
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <>
      <Header isIntro={isIntro} />
      <SectionIntro targetRef={targetRef} />
      <SectionAbout />
      <SectionProjects />
      <Footer />
      {segments[0] === "projects" && segments[1] && <ProjectModal />}
      <Aside/>
    </>
  );
}
