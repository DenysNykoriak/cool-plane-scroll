"use client";

import { Line, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useMemo } from "react";
import Background from "./components/Background";
import PaperAirplane from "./components/PaperAirplane";
import Cloud from "./components/Cloud";

import * as THREE from "three";

const LINE_NB_POINTS = 42;

const HomePage = () => {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(2, 0, -10),
          new THREE.Vector3(-1, 0, -20),
          new THREE.Vector3(0, 0, -30),
          new THREE.Vector3(-1, 0, -40),
          new THREE.Vector3(3, 0, -50),
          new THREE.Vector3(0, 0, -60),
          new THREE.Vector3(2, 0, -70),
          new THREE.Vector3(-1, 0, -80),
          new THREE.Vector3(1, 0, -90),
          new THREE.Vector3(0, 0, -100),
        ],
        false,
        "catmullrom",
        0.5,
      ),
    [],
  );

  const linePoints = useMemo(() => curve.getPoints(LINE_NB_POINTS), [curve]);

  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 30,
        }}
      >
        <Background />
        <OrbitControls />

        <group position-y={-2}>
          <Line
            points={linePoints}
            color="white"
            opacity={0.7}
            transparent
            lineWidth={16}
          />
        </group>

        <PaperAirplane scale={[0.01, 0.01, 0.01]} />
        <Cloud position={[1, 1, -2]} scale={[0.19, 0.19, 0.19]} />
        <Cloud position={[-2, 3, -3]} scale={[0.2, 0.2, 0.2]} />
        <Cloud position={[4, -2, -4]} scale={[0.21, 0.21, 0.21]} />
        <Cloud position={[-3, -1, -5]} scale={[0.2, 0.2, 0.2]} />
        <Cloud position={[2, -3, -6]} scale={[0.2, 0.2, 0.2]} />
        <Cloud position={[-4, 2, -7]} scale={[0.2, 0.2, 0.2]} />
        <Cloud position={[3, 0, -8]} scale={[0.29, 0.29, 0.29]} />
      </Canvas>
    </>
  );
};

export default HomePage;
