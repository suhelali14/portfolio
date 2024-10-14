'use client';
import { createContext, useContext, useState } from 'react';

// Create the context
const UserInterestContext = createContext();

// Create a provider component
export const UserInterestProvider = ({ children }) => {
  const [userInterest, setUserInterest] = useState('Default');

  return (
    <UserInterestContext.Provider value={{ userInterest, setUserInterest }}>
      {children}
    </UserInterestContext.Provider>
  );
};

// Custom hook to use the UserInterest context
export const useUserInterest = () => useContext(UserInterestContext);
