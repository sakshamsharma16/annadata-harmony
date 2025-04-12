
import React, { ReactNode } from 'react';
import { MotionConfig, LazyMotion, domAnimation } from 'framer-motion';

interface MotionProviderProps {
  children: ReactNode;
}

const MotionProvider: React.FC<MotionProviderProps> = ({ children }) => {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
};

export default MotionProvider;
