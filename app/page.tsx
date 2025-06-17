'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionIntro from '@/components/SectionIntro'
import SectionAbout from '@/components/SectionAbout'
import SectionProjects from '@/components/SectionProjects'
import ProjectModal from '@/components/ProjectModal'
import { useSelectedLayoutSegments } from 'next/navigation'

export default function Home() {
  const segments = useSelectedLayoutSegments()

  return (
    <>
      <Header/>
      <SectionIntro />
      <SectionAbout />
      <SectionProjects />
      <Footer/>
      {segments[0] === 'projects' && segments[1] && <ProjectModal />}
    </>
  )
}