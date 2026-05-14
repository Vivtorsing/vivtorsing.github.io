import * as THREE from "three";
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef, useEffect, useState } from "react";

const isSnap = window.__snapshot;

function MinecraftModel({ animation, secretAnimation, setSecretAnimation, cursorNorm }) {
  const { scene } = useGLTF(process.env.PUBLIC_URL + '/model.glb');
  scene.rotation.y = Math.PI;

  const rightArmRef = useRef();
  const leftArmRef = useRef();
  const waistRef = useRef();
  const headRef = useRef();

  //find each item once
  useEffect(() => {
    scene.traverse((child) => {
      if(child.name === 'Right_Arm') {
        rightArmRef.current = child;
      }
      if(child.name === 'Left_Arm') {
        leftArmRef.current = child;
      }
      if(child.name === 'Waist') {
        waistRef.current = child;
      }
      if(child.name === 'Head') {
        headRef.current = child;
      }

    });
  }, [scene]);

  //animate every frame
  useFrame((state) => {
    if(rightArmRef.current) {
      const t = state.clock.getElapsedTime();

      let rightArmRotationZDest = 0;
      let rightArmRotationXDest = 0;
      let leftArmRotationZDest = 0;
      let leftArmRotationXDest = 0;
      let waistScaleYDest = 1;
      let waistRotationZDest = 0;
      let waistRotationXDest = 0;

      //head movement to look at cursor
      const vector = new THREE.Vector3();
      vector.setFromMatrixPosition(headRef.current.matrixWorld);
      vector.project(state.camera);
      const x = cursorNorm?.x ?? 0;
      const y = cursorNorm?.y ?? 0;

      const dx = x - vector.x;
      const dy = y - vector.y + .75;

      let headRotationY = dx * 0.8;
      let headRotationX = -dy * 0.5;

      headRotationY = THREE.MathUtils.clamp(headRotationY, -0.6, 0.6);
      headRotationX = THREE.MathUtils.clamp(headRotationX, -0.4, 0.4);

      //animations to play
      if(animation == "idle") {
        rightArmRotationZDest = .04 + (.04 * Math.sin(t));
        rightArmRotationXDest = .08 * Math.sin(t);
        leftArmRotationZDest = -.04 + (-.04 * Math.sin(t));
        leftArmRotationXDest = -.08 * Math.sin(t);
        waistScaleYDest = 1.01 + (.01 * Math.sin(t));
        waistRotationZDest = .01 + (.01 * Math.sin(t));
      }

      if(animation == "wave") {
        rightArmRotationZDest = ((3 * Math.PI) / 4) + ((Math.PI / 12) * Math.sin(t * 2));
        rightArmRotationXDest = .08 * Math.sin(t);
        leftArmRotationZDest = -.04 + (-.04 * Math.sin(t));
        leftArmRotationXDest = -.08 * Math.sin(t);
        waistScaleYDest = 1.01 + (.01 * Math.sin(t));
        waistRotationZDest = .01 + (.01 * Math.sin(t));
      }

      if(secretAnimation == "secret") {
        rightArmRotationXDest = -(Math.PI / 8);
        rightArmRotationZDest = -(Math.PI / 8);

        leftArmRotationXDest = -(Math.PI / 8);
        leftArmRotationZDest = (Math.PI / 8);

        waistRotationXDest = -(Math.PI / 4);
        waistRotationZDest = (.05 * Math.sin(t));

        headRotationX = -(Math.PI / 4);
        headRotationY = (Math.PI / 8) * Math.sin(t * 4);
      }

      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, rightArmRotationZDest, .1);
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, rightArmRotationXDest, .1);

      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, leftArmRotationZDest, .1);
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, leftArmRotationXDest, .1);

      waistRef.current.scale.y = THREE.MathUtils.lerp(waistRef.current.scale.y, waistScaleYDest, .1);
      waistRef.current.rotation.z = THREE.MathUtils.lerp(waistRef.current.rotation.z, waistRotationZDest, .1);
      waistRef.current.rotation.x = THREE.MathUtils.lerp(waistRef.current.rotation.x, waistRotationXDest, .1);

      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, headRotationY, .1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, headRotationX, .1);
    }
  });

  //if react-snap then return just in case
  if(isSnap) return;

  return <primitive object={scene} onClick={() => {
    setSecretAnimation("secret");

    setTimeout(() => {
      setSecretAnimation(null);

    }, 5000);
  }} />;
}

export default MinecraftModel;