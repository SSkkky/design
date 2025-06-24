import { RefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial, OrbitControls, Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber';
import { useRef } from 'react'
import * as THREE from 'three';
import {GlassSphere, GlassCylinder, GlassSpring, GlassTest} from './3dObject/Glass';

interface Props {
  targetRef: RefObject<any>
}

function CenteredText() {
  const { viewport } = useThree();
  const responsiveFontSize = viewport.width * 0.3 // 10vw 느낌

  return (
    <Text
      fontSize={responsiveFontSize}
      letterSpacing={-0.1}
      color="black"
      anchorX="center"
      anchorY="middle"
      position={[0, 0, -1]}
    >
      HANEUL
    </Text>
  )
}

export default function SectionIntro({ targetRef }: Props) {
  return (
    <div className="w-screen h-screen" ref={targetRef}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1} />
        <pointLight position={[0,0,0]} intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <CenteredText />
        <GlassSphere position={[-1, 1, -2]} />
        <GlassCylinder position={[2.5, -0.5, -0.5]} />
        <GlassSpring position={[-2.8, -1, 0]} />
        {/* <GlassTest position={[1.5, 1, 0]} /> */}
        <Environment  preset="apartment" />
        <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
