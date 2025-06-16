'use client'

import SectionIntro from '@/components/SectionIntro'
import SectionAbout from '@/components/SectionAbout'
import SectionProjects from '@/components/SectionProjects'
import ProjectModal from '@/components/ProjectModal'
import { useSelectedLayoutSegments } from 'next/navigation'

export default function Home() {
  const segments = useSelectedLayoutSegments()

  return (
    <>
      <SectionIntro />
      <SectionAbout />
      <SectionProjects />
      {segments[0] === 'projects' && segments[1] && <ProjectModal />}
    </>
  )
}