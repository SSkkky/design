import { RefObject } from 'react'

interface Props {
  targetRef: RefObject<HTMLElement>
}

export default function SectionIntro({ targetRef }: Props) {
  return (
    <section
      ref={targetRef}
      className="h-screen flex items-center justify-center bg-black text-white"
    >
      <h1 className="text-8xl font-bold">HANEUL</h1>
    </section>
  )
}
