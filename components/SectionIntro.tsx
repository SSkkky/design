import { RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  MeshTransmissionMaterial,
  OrbitControls,
  Text,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import {
  GlassSphere,
  ModelGear,
  GlassSpring,
  ModelSpring,
} from "./3dObject/Glass";

function CenteredText() {
  const { viewport } = useThree();
  const responsiveFontSize = viewport.width * 0.18;

  return (
    <Text
      fontSize={responsiveFontSize}
      letterSpacing={-0.1}
      color="black"
      anchorX="center"
      anchorY="middle"
      position={[0, 0, -1]}
      fontWeight={700}
    >
      SKY ARCHIVE
    </Text>
  );
}

export default function SectionIntro() {

  return (
    <div className="w-screen h-screen relative">
      {/* pointer-events-auto :	Canvas 내부만 이벤트 허용 */}
      <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      className="absolute inset-0 pointer-events-none !touch-pan-y">
        <directionalLight
          position={[0, 10, 10]}
          intensity={20}
          color="#ffffff"
        />
        <pointLight position={[-5, 5, 5]} intensity={100} color="#ffffff" />
        <CenteredText />
        <GlassSphere position={[-1, 1, -2]} />
        <GlassSpring position={[-2.8, -1, 0.5]} />
        <ModelSpring position={[1.5, -1.5, 0.5]} />
        <ModelGear position={[2, 1, -2]} />
        {/* Environment 설정 변경 */}
        <Environment
          preset="studio"
          background={false}
          environmentIntensity={20} // 환경 조명 강도(밝게)
        />
        <OrbitControls
          enableRotate={false}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
