
import React, { ReactNode } from 'react';
import { LazyMotion, domAnimation, MotionConfig, AnimatePresence } from 'framer-motion';

interface MotionProviderProps {
  children: ReactNode;
}

const MotionProvider: React.FC<MotionProviderProps> = ({ children }) => {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user" transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.3 
      }}>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
};

export default MotionProvider;
