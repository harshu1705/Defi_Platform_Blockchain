import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const details = ({ items }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      {items.map(item => (
        <motion.div key={item.id} layoutId={item.id} onClick={() => setSelectedId(item.id)}>
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId}>
            <motion.h5>{items.find(item => item.id === selectedId).subtitle}</motion.h5>
            <motion.h2>{items.find(item => item.id === selectedId).title}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default details;
