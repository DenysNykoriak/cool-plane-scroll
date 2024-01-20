import React from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

import * as THREE from "three";

const Cloud = (props: GroupProps) => {
  const { nodes, materials } = useGLTF("./models/cloud.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.Node as THREE.Mesh).geometry}
        material={materials.lambert2SG}
      />
    </group>
  );
};

useGLTF.preload("./models/cloud.glb");

export default Cloud;
