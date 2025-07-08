"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
import { useSectionRefs } from "@/context/SectionRefContext";

export default function Home() {
  const { sectionRefs } = useSectionRefs();
  const segments = useSelectedLayoutSegments();
  const [shouldRender, setShouldRender] = useState(false);
  const [asideVisible, setAsideVisible] = useState(false);

  useEffect(() => {
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
      window.removeEventListener("resize", renderIntroCursor);
    };
  }, []);

   const setRef = (el: HTMLElement | null, index: number) => {
    sectionRefs.current[index] = el;
  };

   useEffect(() => {
    const handleScroll = () => {
      setAsideVisible(window.scrollY > 0); // 0보다 크면 보여줌
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const asideProps = {scrollToTop, asideVisible}

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}  // 등장할 때
      animate={{ opacity: 1, y: 0 }}   // 현재 상태
      exit={{ opacity: 0, y: -20 }}    // 사라질 때
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {shouldRender && <SmoothFollower />}

      <div ref={(el) => setRef(el, 0)}><SectionIntro /></div>
      <div ref={(el) => setRef(el, 1)}><SectionAbout /></div>
      <div ref={(el) => setRef(el, 2)}><SectionProjects /></div>
      
      {segments[0] === "projects" && segments[1] && <ProjectModal />}
      <Aside asideProps={asideProps} />
    </motion.div>
  );
}
