"use client";

import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Background from "./components/Background";
import Scene from "./components/Scene";

const HomePage = () => {
  return (
    <>
      <Canvas>
        <ScrollControls pages={5} damping={0.3}>
          <Scene />
        </ScrollControls>
      </Canvas>
    </>
  );
};

export default HomePage;
