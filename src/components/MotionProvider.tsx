
import React, { ReactNode } from 'react';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';

interface MotionProviderProps {
  children: ReactNode;
}

const MotionProvider: React.FC<MotionProviderProps> = ({ children }) => {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
};

export default MotionProvider;
