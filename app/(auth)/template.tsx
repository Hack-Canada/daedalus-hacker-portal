"use client";

import { motion } from "framer-motion";

type Props = { children: React.ReactNode };

const template = ({ children }: Props) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {children}
    </motion.div>
  );
};
export default template;
