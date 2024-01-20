import React from "react";
import { useGLTF } from "@react-three/drei";

import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";

const PaperAirplane = (props: GroupProps) => {
  const { nodes, materials } = useGLTF("./models/paperAirplane.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.Plane as THREE.Mesh).geometry}
        material={(materials.White as THREE.Material).clone()}
      >
        <primitive
          object={materials.White}
          attach="material"
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

useGLTF.preload("./models/paperAirplane.glb");

export default PaperAirplane;
