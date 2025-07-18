import { useState, useEffect, useCallback, RefObject, use } from "react";
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
import Loader from "@/components/common/Loader";

function CenteredText({ onLoad }: { onLoad?: () => void }) {
  const { viewport } = useThree();
  const responsiveFontSize = viewport.width * 0.18;

  useEffect(() => {
    onLoad?.();
    console.log('CenteredText loaded')
  }, []);

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
  const TOTAL_MODELS = 5;
  const [loadedCount, setLoadedCount] = useState(0);

  const handleModelLoad = useCallback(() => {
    setLoadedCount((prev) => prev + 1);
  }, []);

  const isAllLoaded = loadedCount >= TOTAL_MODELS;

  useEffect(() => {
    console.log(`Models loaded: ${loadedCount}/${TOTAL_MODELS}`);
  },[loadedCount])

  return (
    <div className="w-screen h-screen relative">
      {!isAllLoaded && (<Loader/>)}
      {/* pointer-events-auto :	Canvas 내부만 이벤트 허용 */}
       <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          className="absolute inset-0 pointer-events-none !touch-pan-y"
        >
          <directionalLight position={[0, 10, 10]} intensity={20} />
          <pointLight position={[-5, 5, 5]} intensity={100} />
          <CenteredText onLoad={handleModelLoad} />
          <GlassSphere position={[-1, 1, -2]} onLoad={handleModelLoad} />
          <GlassSpring position={[-2.8, -1, 0.5]} onLoad={handleModelLoad} />
          <ModelSpring position={[1.5, -1.5, 0.5]} onLoad={handleModelLoad} />
          <ModelGear position={[2, 1, -2]} onLoad={handleModelLoad} />
          <Environment
            preset="studio"
            background={false}
            environmentIntensity={20}
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
