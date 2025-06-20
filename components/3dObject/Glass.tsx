// components/3dObject/Glass.tsx
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, MeshTransmissionMaterial } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

/** 1. 유리 구슬 */
export function GlassSphere({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * 0.3
  })

  return (
    <mesh ref={ref} position={position} scale={[0.7, 0.7, 0.7]}>
      <torusGeometry args={[1, 0.4, 12, 100]} />
      <MeshTransmissionMaterial
        transmission={1}
        roughness={0}
        thickness={1}
        ior={1.5}
        chromaticAberration={0.3}
        distortion={0.5}
        distortionScale={0.5}
        temporalDistortion={0.1}
        background={new THREE.Color('white')}
      />
    </mesh>
  )
}

/** 2. 유리 원기둥 */
export function GlassCylinder({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * 0.3
  })

  return (
    <mesh ref={ref} position={position} scale={[1, 1.2, 1]}>
      <cylinderGeometry args={[0.6, 0.6, 2, 64]} />
      <MeshTransmissionMaterial
        transmission={1}
        roughness={0}
        thickness={1}
        ior={1.4}
        chromaticAberration={0.08}
        distortion={0.5}
        distortionScale={0.4}
        background={new THREE.Color('transparent')}
      />
    </mesh>
  )
}

/** 3. 유리 스프링 (토러스 꼬은 형태로 간단 대체) */
export function GlassSpring({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() * 0.2
  })

  return (
    <mesh ref={ref} position={position} scale={[1,1,1]}>
      <torusKnotGeometry args={[0.6, 0.2, 150, 20]} />
      <MeshTransmissionMaterial
        transmission={1}
        roughness={0}
        thickness={1.2}
        ior={1.6}
        chromaticAberration={0.12}
        distortion={0.5}
        distortionScale={0.5}
        temporalDistortion={0.15}
        background={new THREE.Color('white')}
      />
    </mesh>
  )
}
