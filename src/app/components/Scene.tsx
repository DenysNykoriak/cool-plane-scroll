import React, { useMemo, useRef } from "react";

import * as THREE from "three";
import PaperAirplane from "./PaperAirplane";
import Cloud from "./Cloud";
import Background from "./Background";
import {
  Float,
  OrbitControls,
  PerspectiveCamera,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const LINE_NB_POINTS = 1200;

type Props = {};

const Scene = (props: Props) => {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 0, -5),
          new THREE.Vector3(2, 0, -10),
          new THREE.Vector3(-1, 0, -20),
          new THREE.Vector3(0, 0, -30),
          new THREE.Vector3(-1, 0, -40),
          new THREE.Vector3(3, 0, -50),
          new THREE.Vector3(0, 0, -60),
          new THREE.Vector3(2, 0, -70),
        ],
        false,
        "catmullrom",
        0.5,
      ),
    [],
  );

  const linePoints = useMemo(() => curve.getPoints(LINE_NB_POINTS), [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0.2, 0.2);

    return shape;
  }, [curve]);

  const cameraGroupRef = useRef<THREE.Group>(null);
  const airplaneGroupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((_state, delta) => {
    if (!cameraGroupRef.current || !airplaneGroupRef.current) return;

    const currentPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1,
    );

    const currentPoint = linePoints[currentPointIndex];
    const pointAhead =
      linePoints[Math.min(currentPointIndex + 3, linePoints.length - 1)];

    const xDisplacement = (pointAhead.x - currentPoint.x) * 80;

    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 20);

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplaneGroupRef.current.rotation.x,
        airplaneGroupRef.current.rotation.y,
        angleRotation,
      ),
    );
    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        cameraGroupRef.current.rotation.x,
        angleRotation,
        cameraGroupRef.current.rotation.z,
      ),
    );

    airplaneGroupRef.current.quaternion.slerp(
      targetAirplaneQuaternion,
      delta * 2,
    );
    cameraGroupRef.current.quaternion.slerp(targetCameraQuaternion, delta * 2);

    cameraGroupRef.current?.position.lerp(currentPoint, delta * 24);
  });

  return (
    <>
      {/* <OrbitControls enableZoom={false} /> */}

      <group ref={cameraGroupRef}>
        <Background />
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />

        <group ref={airplaneGroupRef}>
          <Float floatIntensity={1} speed={2}>
            <PaperAirplane
              scale={[0.01, 0.01, 0.01]}
              position-y={-0.5}
              rotation={[0.3, 0, 0]}
            />
          </Float>
        </group>
      </group>

      {/* Curve */}
      <group position-y={-2}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial color="white" opacity={0.7} transparent />
        </mesh>
      </group>

      {/* Clouds */}
      <Cloud position={[1, 1, -2]} scale={[0.19, 0.19, 0.19]} />
      <Cloud position={[-2, 1, -21]} scale={[0.2, 0.2, 0.2]} />
      <Cloud position={[2, 0, -19]} scale={[0.21, 0.21, 0.21]} />
      <Cloud position={[-1, -1, -15]} scale={[0.2, 0.2, 0.2]} />
      <Cloud position={[2.5, -2, -6]} scale={[0.2, 0.2, 0.2]} />
      <Cloud position={[-4, 2, -7]} scale={[0.2, 0.2, 0.2]} />
      <Cloud position={[3, 0, -8]} scale={[0.29, 0.29, 0.29]} />
      <Cloud position={[-3, 0, -13]} scale={[0.3, 0.3, 0.3]} />
      <Cloud position={[-3, -2, -5]} scale={[0.3, 0.3, 0.3]} />
    </>
  );
};

export default Scene;
