import { Environment, Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";
import React from "react";

import * as THREE from "three";

const Background = () => (
  <>
    <Environment preset="sunset" />
    <Sphere scale={[100, 100, 100]}>
      <LayerMaterial lighting="physical" transmission={1} side={THREE.BackSide}>
        <Gradient
          colorA="#58bae5"
          colorB="#d7f3fd"
          axes="y"
          start={0}
          end={-0.5}
        />
      </LayerMaterial>
    </Sphere>
  </>
);

export default Background;
