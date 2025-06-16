'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ProjectModal() {
  const params = useParams()
  const router = useRouter()
  const modalRef = useRef(null)

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => router.replace('/#projects'), // ← 변경된 부분
    })
  }

  useEffect(() => {
    gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
  }, [])

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-white/90 backdrop-blur p-8 z-50 overflow-y-auto"
    >
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{params.slug} 상세</h2>
        <p className="mb-8">여기에 상세 내용을 표시</p>
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          ← 닫기
        </button>
      </div>
    </div>
  )
}
