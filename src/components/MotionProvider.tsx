
import React, { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';

interface MotionProviderProps {
  children: ReactNode;
}

const MotionProvider: React.FC<MotionProviderProps> = ({ children }) => {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
};

export default MotionProvider;
