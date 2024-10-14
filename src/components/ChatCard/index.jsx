import React from 'react';
import { motion } from 'framer-motion';

const chatCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } }
};

function ChatCard({ chat }) {
  return (
    <motion.div
      className='p-4 bg-white shadow-lg rounded-lg border-l-4 border-blue-500 mb-4'
      variants={chatCardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <strong className='text-blue-500'>{chat.sender}:</strong>
      <p className='text-gray-700'>{chat.message}</p>
    </motion.div>
  );
}

export default ChatCard;
