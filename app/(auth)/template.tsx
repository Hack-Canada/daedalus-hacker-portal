"use client";

import { motion } from "framer-motion";

type Props = { children: React.ReactNode };

const template = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
export default template;
