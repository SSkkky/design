'use client'

import React, { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionIntro from '@/components/SectionIntro'
import SectionAbout from '@/components/SectionAbout'
import SectionProjects from '@/components/SectionProjects'
import ProjectModal from '@/components/ProjectModal'
import { useSelectedLayoutSegments } from 'next/navigation'

export default function Home() {
  const segments = useSelectedLayoutSegments();
  const [isIntro, setIsIntro] = useState<boolean>(true);
  const targetRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        // console.log(targetRef.current.getBoundingClientRect());
        targetRef.current.getBoundingClientRect().bottom < 0 ? setIsIntro(false) : setIsIntro(true);
      }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll() // 초기 체크 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      setIsIntro(false); // 컴포넌트 언마운트 시 초기화
      targetRef.current = null; // 타겟 ref 초기화
      console.log('Cleanup');  
    }
  }, [])

  useEffect(() => {
    console.log('isIntro changed:', isIntro);
  }, [isIntro])

  return (
    <>
      <Header isIntro={false}/>
      <SectionIntro targetRef={targetRef}/>
      <SectionAbout />
      <SectionProjects />
      <Footer/>
      {segments[0] === 'projects' && segments[1] && <ProjectModal />}
    </>
  )
}