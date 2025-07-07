/* ⚛ REACT */
import React, { createContext, useState, useEffect, useContext} from 'react';
import { WebSocketContext } from './WebSocketContext';
import { ContactsContext } from './ContactsContext';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const { sendMessage, socketData, connectionStatus } = useContext(WebSocketContext);
  // const { contacts } = useContext(ContactsContext);
  let user_id = localStorage.getItem("user_id");
  let user_name = localStorage.getItem("user_name");

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
    if (connectionStatus === 'Conectado') {
      sendMessage(JSON.stringify({
            channel: "user",
            method: "GET-contacts",
            _id: user_id,
        }));
    }
  }, [connectionStatus, sendMessage]);


  useEffect(() => {
    if (socketData?.contacts  && Array.isArray(socketData.contacts)) {
      setContacts(socketData.contacts);
    }
  }, [socketData]);
  
  useEffect(() => {
    if (socketData?.type === "messageList" && Array.isArray(socketData.msg)) {

      const idToUsernameMap = {};
      if (contacts && contacts.length > 0) {
        contacts.forEach(contact => {
          if (contact?._id && contact?.username) {
            idToUsernameMap[contact._id] = contact.username;
          } 
          if (user_id){
            idToUsernameMap[user_id] = user_name;
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