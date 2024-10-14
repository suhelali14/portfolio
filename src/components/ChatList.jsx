import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // For animations (like fade-in)

const ChatList = ({ messages, inputMessage, isLoading, handleSendMessage, handleInputChange, handleKeyPress }) => {
  const chatEndRef = useRef(null); // Ref for auto-scrolling
  const messageContainerRef = useRef(null); // Ref for the chat container

  // Scroll to bottom when new message arrives
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-96 relative">
      {/* Chat Window */}
      <div className="flex-1 border rounded-lg h-80 w-full shadow-lg bg-white absolute bottom-16 overflow-hidden">
        {/* Chat Message List */}
        <div
          ref={messageContainerRef}
          className="overflow-y-auto h-full p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300"
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`chat-message mb-2 p-2 rounded-lg ${
                msg.sender === 'You'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-300 text-gray-800 self-start'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <strong>{msg.sender}: </strong> {msg.message}
            </motion.div>
          ))}
          {/* Scroll to this div when a new message is sent */}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Section */}
      <div className="flex items-center h-fit p-4 border-t bg-white absolute bottom-0  w-full">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={isLoading ? 'Wait, I am thinking...' : 'Type your message...'}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatList;
