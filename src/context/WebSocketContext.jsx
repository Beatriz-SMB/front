import React, { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const socket = useSocket('');

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};