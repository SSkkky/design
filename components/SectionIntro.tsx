import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SectionIntro() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 20%',
        },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-8xl font-bold">HANEUL</h1>
    </section>
  )
}
