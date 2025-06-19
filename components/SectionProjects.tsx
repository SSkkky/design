'use client'

import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState  } from 'react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    slug: 'skygram',
    title: 'Skygram',
    desc: 'Instagram 스타일 소셜 미디어 앱. Firebase 인증, Next.js 14, Tailwind CSS 기반.',
    image: '/images/skygram.jpg',
  },
  {
    slug: 'taskify',
    title: 'Taskify',
    desc: 'Zustand와 Drag & Drop으로 구현한 칸반 스타일 To-Do 앱.',
    image: '/images/taskify.jpg',
  },
  {
    slug: 'portfolio-site',
    title: '포트폴리오 웹사이트',
    desc: 'GSAP을 활용한 인터랙티브 원페이지 웹사이트. 반응형 지원.',
    image: '/images/portfolio.jpg',
  },
  {
    slug: 'weather-wizard',
    title: 'Weather Wizard',
    desc: 'OpenWeatherMap API를 이용한 날씨 조회 앱. 위치 기반 기능 포함.',
    image: '/images/weather.jpg',
  },
  {
    slug: 'code-snap',
    title: 'CodeSnap',
    desc: '코드 스니펫을 공유하고 저장하는 플랫폼. Markdown 지원.',
    image: '/images/codesnap.jpg',
  },
  {
    slug: 'chatwise',
    title: 'ChatWise',
    desc: 'Socket.io 기반 실시간 채팅 앱. 로그인 및 다중 채널 기능 포함.',
    image: '/images/chatwise.jpg',
  },
]

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div
      onClick={() => window.location.href = `/projects/${project.slug}`}
      className="break-inside-avoid cursor-pointer bg-white border rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300"
    >
      <div className="relative w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse z-10">
            <span className="text-sm text-gray-400">Loading...</span>
          </div>
        )}
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
        <p className="text-sm text-gray-700">{project.desc}</p>
      </div>
    </div>
  )
}

export default function SectionProjects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
  }, [])

  return (
    <section ref={sectionRef} className="px-6 py-16 bg-white text-black">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
