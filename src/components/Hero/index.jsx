'use client'
import styles from './style.module.scss'
import React, { useRef } from 'react'
import { useUserInterest } from '@/context/UserIntrestContext';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
const Hero = () => {
  const { userInterest, setUserInterest } = useUserInterest(); // Use the global context
  const parallaxRef = useRef(null);
  const targetref=useRef(null);
  const {scrollYProgress}=useScroll({
    target:targetref,
    offset:["start end","end start"],
  });

  const scale=useTransform(scrollYProgress,[1,0],[1.35,0.88]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const smoothTranslate = useSpring(yTranslate, { damping: 15, stiffness: 80 });
  return (
    <>
      <div className="relative w-full h-screen">
        <div className=' absolute text-center w-full h-full'>
          <h1 className={styles.title}>I AM SUHELALI</h1>
        </div>
        
      </div>
      <motion.div className='absolute   w-full flex justify-center h-full rounded' style={{scale,smoothTranslate}} ref={targetref}>
          <Image
            className="rounded-xl"
            src="/Images/back.jpg"
            width={1080}
            height={920}
          />
      </motion.div>
      
     
    </>
  )
}

export default Hero