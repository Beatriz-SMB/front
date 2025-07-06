/* ⚛ REACT */
import React, { createContext, useState, useEffect, useContext} from 'react';
import { useSocket } from '../hooks/useSocket';
import { ContactsContext } from './ContactsContext';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const { sendMessage, socketData, connectionStatus } = useSocket('');
  const { contacts } = useContext(ContactsContext);

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

      const idToUsernameMap = {};
      if (contacts && contacts.length > 0) {
        contacts.forEach(contact => {
          if (contact?.id && contact?.username) {
            idToUsernameMap[contact.id] = contact.username;
          }
        });
      }

      const processedMessages = socketData.msg.map(msg => {
        return {
          ...msg,
          Username: idToUsernameMap[msg.SenderID] || "Unknown"
        };
      });

      setMessages(processedMessages);
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