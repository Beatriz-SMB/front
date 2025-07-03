/* ⚛ REACT */
import React, { createContext, useState, useEffect} from 'react';
import { useSocket } from '../hooks/useSocket';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const { sendMessage, socketData, connectionStatus } = useSocket('');

  const [chatID, setChatID] = useState(null);

  useEffect(() => {
    if (chatID && connectionStatus === 'Conectado') {
      sendMessage(JSON.stringify({
        channel: "messages",
        method: "GET",
        chatId: chatID,
      }));
    }
  }, [chatID, connectionStatus, sendMessage]);

  useEffect(() => {
    if (socketData?.type === "messageList" && Array.isArray(socketData.msg)) {
      setMessages(socketData.msg);
    }
    if (socketData?.msg == null && socketData?.type === "messageList"){
      setMessages([]);
    }
  }, [socketData]);

  const showMessage = (type, content = null) => {

    if (!type || !content) {
      console.error("Type and content are required to show a message.");
      return;
    }

    const id = Date.now();

    const newMessage = {
      id,
      type,
      content,
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 3000);
  };

  const hideMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <MessageContext.Provider value={{ 
      messages, 
      showMessage, 
      chatID,
      setChatID,
      hideMessage,
      connectionStatus,
      addMessage,
    }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };