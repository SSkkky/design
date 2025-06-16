'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProjectPage() {
  const router = useRouter()

  useEffect(() => {
    router.back();
  }, [])

  return (
    <>ㅇㅅㅇ??</>
  )
}
