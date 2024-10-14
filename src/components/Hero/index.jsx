'use client'
import styles from './style.module.scss'
import React from 'react'
import { useUserInterest } from '@/context/UserIntrestContext';
import Image from 'next/image';

const Hero = () => {
  const { userInterest, setUserInterest } = useUserInterest(); // Use the global context
  return (
    <>
       <div className="relative">
       <div className='text-center w-full h-full'>
          <h1 className={styles.title}>I AM SUHELALI</h1>
          
       </div>
       <div className='w-full h-full '>
            <Image 
            className={styles.img}
            src="/Images/back.jpg"
            layout='fill'
            />
       </div>
       </div>
    </>
  )
}

export default Hero