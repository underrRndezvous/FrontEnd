// src/components/layout/AnimatedPageLayout.tsx
import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedPageLayoutProps {
  children: ReactNode;
}

const AnimatedPageLayout = ({ children }: AnimatedPageLayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPageLayout;
