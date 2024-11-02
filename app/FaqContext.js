import React, { createContext, useContext, useState } from 'react';

// Create a Context
const FaqContext = createContext();

// Custom hook to use the FaqContext
export const useFaq = () => useContext(FaqContext);

export const FaqProvider = ({ children }) => {
  const [faqData, setFaqData] = useState({ next: 1, data: [] });

  const updateFaqData = (newData) => {
    setFaqData((prevData) => ({
      ...prevData,
      ...newData,
      next: newData.data ? newData.data.length + 1 : prevData.next,
    }));
  };

  return (
    <FaqContext.Provider value={{ faqData, updateFaqData }}>
      {children}
    </FaqContext.Provider>
  );
};
