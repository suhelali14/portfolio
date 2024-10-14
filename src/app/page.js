'use client';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import Chatbot from '@/components/Chatbot';
import { UserInterestProvider } from '@/context/UserIntrestContext'; // Import the provider
import Hero from '@/components/Hero';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <main>
      <UserInterestProvider> {/* Wrap components with provider */}
        <AnimatePresence mode='wait'>
          {isLoading && <Preloader />}
        </AnimatePresence>

        <AnimatePresence mode='wait'>
          {!isLoading && <Chatbot />}
        </AnimatePresence>

        <AnimatePresence mode='wait'>
          {!isLoading && <Hero />}
        </AnimatePresence>

      </UserInterestProvider>
    </main>
  );
}
