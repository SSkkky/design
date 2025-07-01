// components/3dObject/Glass.tsx
'use client'

import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
// @ts-ignore
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

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
        thickness={1.2}
        ior={2}
        chromaticAberration={0.5}
        distortion={0.5}
        distortionScale={0.5}
        temporalDistortion={0.1}
        background={new THREE.Color('white')}
      />
    </mesh>
  )
}

/** 2. 스프링 모델 obj */
export function ModelSpring({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!)
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)

  const obj = useLoader(OBJLoader, '/assets/models/spring/Spring OBJ.obj')

  
  useEffect(() => {
    // OBJ 로드 후 첫 번째 mesh의 geometry만 추출
    obj.traverse((child:any) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        setGeometry(mesh.geometry)
      }
    })
  }, [obj])


   // 회전 애니메이션
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.3
    }
  })
  
  // geometry 로드 전에는 렌더링하지 않음
  if (!geometry) return null

  return (
    <mesh
      geometry={geometry}
      ref={ref}
      position={position}
      scale={[0.12, 0.12, 0.12]}
      rotation={[Math.PI / 2, -(Math.PI / 5), 0]} // X축을 기준으로 90도 회전
    >
      <MeshTransmissionMaterial
        transmission={1}
        roughness={0.7}
        thickness={1}
        ior={1.5}
        chromaticAberration={0.3}
        distortion={0.5}
        distortionScale={0.5}
        temporalDistortion={0.15}
        background={new THREE.Color('white')}
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

/** 4. 기어 모델 gltf*/
export function ModelGear({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!)
  const { nodes, materials } = useGLTF('/assets/models/gear/scene.gltf');

   useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() * 0.2
  })

  return (
    <mesh
      geometry={(nodes.Cylinder_Material001_0 as THREE.Mesh).geometry}
      castShadow
      receiveShadow
      ref={ref}
      position={position}
      scale={[1, 1, 1]}
    >
      <MeshTransmissionMaterial
        transmission={1}
        roughness={0}
        thickness={0.5}
        ior={1.5}
        chromaticAberration={0.3}
        distortion={0.5}
        distortionScale={0.5}
        temporalDistortion={0.1}
        attenuationColor={'#ffffff'}
        attenuationDistance={2}
      />
    </mesh>
  )
}

