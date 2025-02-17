import {useUserStore} from '@/stores/user-store';
import {useEffect, useRef, useState} from 'react';
import {Socket, io} from 'socket.io-client';

export const useUserOnline = () => {
  const {currentUser} = useUserStore(state => state);
  const [userOnline, setUserOnline] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!currentUser?._id) return;

    if (!socketRef.current) {
      socketRef.current = io('http://192.168.0.198:4000'); // Initialize socket only once
    }

    const socket = socketRef.current;
    socket.emit('userConnected', currentUser._id);
    // socket.emit('join', currentUser._id); // Send user ID to server

    socket.on('userStatus', ({userId, isOnline}) => {
      if (userId === currentUser._id) {
        console.log(`User ${userId} is ${isOnline ? 'online' : 'offline'}`);
        setUserOnline(isOnline);
      }
    });

    return () => {
      socket.off('userStatus');
      socket.disconnect(); // Properly disconnect on cleanup
    };
  }, [currentUser._id]); // Only rerun if user ID changes

  return userOnline;
};
