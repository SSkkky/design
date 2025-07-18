// components/3dObject/Glass.tsx
"use client";

import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  MeshTransmissionMaterial,
  useGLTF,
} from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

/** 1. 유리 구슬 */
export function GlassSphere({
  position,
  onLoad,
}: {
  position: [number, number, number];
  onLoad?: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    console.warn('onLoad')
    console.warn(onLoad)
    console.warn('------')
    onLoad?.();
    console.log('GlassSphere loaded')
  }, []);

 useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.2;
    }
  });

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
        background={new THREE.Color("white")}
      />
    </mesh>
  );
}

/** 2. 스프링 모델 obj */
export function ModelSpring({
  position,
  onLoad,
}: {
  position: [number, number, number];
  onLoad?: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  // 기본 geometry는 별도의 비동기 로드가 없기 때문에 바로 onLoad 호출
  useEffect(() => {
    onLoad?.();
    console.log('ModelSpring loaded')
  }, []);

 useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={[1, 1, 1]}>
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
        background={new THREE.Color("white")}
      />
    </mesh>
  );
}

/** 3. 유리 스프링 (토러스 꼬은 형태로 간단 대체) */
export function GlassSpring({
  position,
  onLoad,
}: {
  position: [number, number, number];
  onLoad?: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    onLoad?.();
    console.log('GlassSpring loaded')
  }, []);

 useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={[1, 1, 1]}>
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
        background={new THREE.Color("white")}
      />
    </mesh>
  );
}

/** 4. 기어 모델 gltf*/
export function ModelGear({
  position,
  onLoad,
}: {
  position: [number, number, number];
  onLoad?: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const gltf = useGLTF("/assets/models/gear/scene.gltf");

  // 첫 마운트 시 한 번만 onLoad 호출
  useEffect(() => {
    onLoad?.();
    console.log("ModelGear loaded");
  }, []); // nodes를 의존성으로 두지 않음

 useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.2;
    }
  });
  return (
    <mesh
      geometry={(gltf.nodes.Cylinder_Material001_0 as THREE.Mesh).geometry}
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
        attenuationColor={"#ffffff"}
        attenuationDistance={2}
      />
    </mesh>
  );
}

