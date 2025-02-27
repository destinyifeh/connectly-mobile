import {API_BASE_URL} from '@/constants/config';
import {useUserStore} from '@/stores/user-store';
import React, {createContext, useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';

type SocketContextType = Socket | null;

type SocketProviderProps = {
  children: React.ReactNode;
};

// Create the context with a default value
export const SocketContext = createContext<SocketContextType>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {
  const {currentUser} = useUserStore(state => state);
  const [socket, setSocket] = useState<SocketContextType>(null);
  console.log(currentUser?._id, 'my context id');
  useEffect(() => {
    if (currentUser?._id) {
      const newSocket = io(API_BASE_URL, {
        auth: {userId: currentUser._id},
      });

      setSocket(newSocket);

      // Set up the 'userStatus' listener
      newSocket.on('userStatus', ({userId, isOnline}) => {
        console.log(`User ${userId} is ${isOnline ? 'online' : 'offline'}`);
        // Handle the status update as needed
      });

      // Clean up the socket connection on unmount
      return () => {
        console.log('diconnecting socket...');
        newSocket.disconnect();
      };
    }
  }, [currentUser?._id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
