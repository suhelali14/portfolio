/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  useScroll,
} from "@react-three/drei";
import { render, useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";

import { Canvas } from "@react-three/fiber";
import Image from 'next/image'
import styles from './style.module.scss'
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { Avatar } from "../Avatar";
 

export default function Home() {

   // Use a ref for the last mouse x position
   const lastX = useRef(0);
   // Use a ref for rotation speed
   const rotationSpeed = useRef(0);
   // Define a damping factor to control rotation damping
   const dampingFactor = 0.95;

  const [isWalking, setIsWalking] = useState(false);
  const [section, setSection] = useState(0);
  const [isMovingBackward, setIsMovingBackward] = useState(false); // For backward movement
  const [characterRotation, setCharacterRotation] = useState(0);

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();
  
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (slider.current && firstText.current && secondText.current) {
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.5,
          start: 0,
          end: window.innerHeight,
          onUpdate: e => direction = e.direction * -1
        },
        x: "-500px",
      });

      requestAnimationFrame(animate);
    }
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    xPercent += 0.03 * direction;
    requestAnimationFrame(animate);
  };
  const characterContainerAboutRef = useRef();

  const [characterAnimation, setCharacterAnimation] = useState("Wave");

  const characterGroup = useRef();

  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing} id='home'>
      
      <Canvas shadows camera={{ position: [0, 2, 12], fov: 42 }}>
        <SceneContent />
      </Canvas>

      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <div>
            <p ref={firstText}>Rishi Lahoti —</p>
            <p ref={secondText}>Rishi Lahoti —</p>
          </div>
        </div>
      </div>
      <div data-scroll data-scroll-speed={0.1} className={styles.description}>
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#dafff8" />
              <stop offset="100%" stopColor="#c1ff5d" />
            </linearGradient>
          </defs>
          <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="url(#grad1)" />
        </svg>
        <p>Freelance</p>
        <p>Designer & Developer</p>
      </div>
    </motion.main>
  );
}

function SceneContent() {
  const { viewport } = useThree();
  const data = useScroll();
  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;
  const officeScaleRatio = Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));

  const characterGroup = useRef();
  const characterContainerAboutRef = useRef();

  return (
    <>
      <motion.group
        ref={characterGroup}
        rotation-y={0}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        animate={"" + 0}
        transition={{
          duration: 0.6,
        }}
        renderOrder={1}
        variants={{
          y: -2,
          x: isMobile ? 0.3 : 0,
          z: 2,
          rotateX: 0,
          rotateY: isMobile ? 0 : 3,
          rotateZ: 0,
          scaleX: isMobile ? 0.7 : 2,
          scaleY: isMobile ? 0.7 : 2,
          scaleZ: isMobile ? 0.7 : 2,
        }}
      >
        <Avatar animation="Wave" />
      </motion.group>
      <ambientLight intensity={1} />
      <motion.group
        position={[
          isMobile ? 0 : 1.5 * officeScaleRatio,
          isMobile ? -viewport.height / 6 : 2,
          3,
        ]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: isMobile ? -viewport.height / 4 : 0,
        }}
        transition={{
          duration: 0.6,
        }}
      >
        <group
          ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={isMobile ? [0, 0, 0] : [-1.7, -7.25, 0.57]}
          rotation={[-Math.PI, 2.42, -Math.PI]}
        ></group>
      </motion.group>
    </>
  );
}
