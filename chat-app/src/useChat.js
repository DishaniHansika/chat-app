import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; 
const SOCKET_SERVER_URL = "http://localhost:7000";

const useChat = (groupId) => {
    const [messages, setMessages] = useState([]);  // Sent and received messages
    const socketRef = useRef();
    
    useEffect(() => {
    
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
          query: { groupId },
        });
        
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
              ...message,
              currentUser: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
          });
        
        return () => {
          socketRef.current.disconnect();
        };
      }, [groupId]);

      const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
          body: messageBody,
          senderId: socketRef.current.id,
        });
      };
    
      return { messages, sendMessage };
    };
    
    
    export default useChat;