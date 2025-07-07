/* ⚛ REACT */
import React, { createContext, useState, useEffect, useContext} from 'react';
import { WebSocketContext } from './WebSocketContext';

const ContactsContext = createContext();

const ContactsProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const [userContacts, setUserContacts] = useState([]);
    const { socketData, sendMessage} = useContext(WebSocketContext);
    
    useEffect(() => {
        sendMessage(JSON.stringify({
            channel: "user",
            method: "GET-all",
        }));
    }, []);
    useEffect(() => {
        if(socketData){
            const formattedUsers = socketData.users?.map(user => ({
                id: user.ID,
                name: user.Name,
                username: user.Username,
                email: user.Email,
            }));
            setContacts(formattedUsers);
        }
    }, [socketData]);

  return (
    <ContactsContext.Provider value={{ 
      contacts, 
      userContacts,
    }}>
      {children}
    </ContactsContext.Provider>
  );
};

export { ContactsContext, ContactsProvider };