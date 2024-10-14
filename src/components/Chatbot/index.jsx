// 'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './chatbot.module.scss';
import ChatList from '../ChatList';
import Lottie from 'react-lottie';
import axios from 'axios';
import animationData from '../lotties/chatbot';
import { IoIosCloseCircle } from 'react-icons/io';
import { useUserInterest } from '@/context/UserIntrestContext'; // Import the context hook

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Store chat messages
  const [inputMessage, setInputMessage] = useState(''); // Store user input
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [UserMessage, setUserMessage] = useState([]); // Store user messages
  
  const { userInterest, setUserInterest } = useUserInterest(); // Use the global context

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const toggleChat = () => setIsOpen(!isOpen);

  // Handle sending message to the chatbot API
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      sender: 'You',
      message: inputMessage,
    };

    // Add the user's message to the conversation
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserMessage((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    const conversationHistory = messages
      .map((msg) => `${msg.sender}: ${msg.message}`)
      .join('\n') + `\nYou: ${inputMessage}`;

    const conversationHistory2 = UserMessage
      .map((msg) => `${msg.sender}: ${msg.message}`)
      .join('\n') + `\nYou: ${inputMessage}`;

    try {
      // Call chatbot API
      const chatResponse = await axios.post('/api/Chatapi', {
        message: inputMessage,
        conversation: conversationHistory,
      });

      const aiResponse = {
        sender: 'AI',
        message: chatResponse.data.response,
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);

      // Call API to get user interest
      const interestResponse = await axios.post('/api/GetInterest', {
        conversation: conversationHistory2,
      });

      // Set user interest globally
      setUserInterest(interestResponse.data.interest);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat icon to toggle the chat window */}
      <div className={styles.chatIcon} onClick={toggleChat}>
        <div className={styles.iconContent}>
          <motion.div animate={{ rotate: isOpen ? 360 : 0 }} transition={{ duration: 0.3 }}>
            <Lottie options={defaultOptions} height={40} width={40} />
          </motion.div>
        </div>
      </div>

      {/* Display user's interest */}
      {/* <div>User Interest: {userInterest}</div> */}

      {/* Chat window with ChatList component */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.chatHeader}>
              <h4>Chat with Me</h4>
              <button onClick={toggleChat} className={styles.closeBtn}>
                <IoIosCloseCircle />
              </button>
            </div>
            <div className={styles.chatBody}>
              <ChatList
                messages={messages}
                inputMessage={inputMessage}
                isLoading={isLoading}
                handleSendMessage={handleSendMessage}
                handleInputChange={handleInputChange}
                handleKeyPress={handleKeyPress}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
