'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'
import gsap from 'gsap'

export default function ProjectDetailPage() {
  const router = useRouter()
  const params = useParams()

  const handleBack = () => {
    gsap.to(".page-wrapper", {
      opacity: 0,
      duration: 0.5,
      onComplete: () => router.back(),
      ease: "power2.inOut"
    })
  }

  useEffect(() => {
    gsap.fromTo(".page-wrapper", { opacity: 0 }, { opacity: 1, duration: 0.5 })
  }, [])

  return (
    <div className="page-wrapper min-h-screen px-6 py-16 bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">{params.slug} 상세 페이지</h1>
      <p className="mb-8">여기에 프로젝트 설명을 넣을 수 있습니다.</p>
      <button
        onClick={handleBack}
        className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
      >
        ← 뒤로가기
      </button>
    </div>
  )
}
