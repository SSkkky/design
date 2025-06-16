'use client'

import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { slug: 'portfolio', title: 'My Portfolio', desc: 'Next.js + GSAP 사이트' },
  { slug: 'todo-app', title: 'Todo App', desc: 'Zustand 사용 예제' },
]

export default function SectionProjects() {
  const router = useRouter()
  const sectionRef = useRef(null)

  const handleClick = (slug: string) => {
    router.push(`/projects/${slug}`)
  }

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.utils.toArray('.project-item').forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: 'power2.out',
      })
    })
  }, [])

  return (
    <section ref={sectionRef} className="px-6 py-16 bg-white text-black">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.slug}
            onClick={() => handleClick(project.slug)}
            className="project-item cursor-pointer border p-4 rounded hover:bg-gray-100 transition"
          >
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p>{project.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
