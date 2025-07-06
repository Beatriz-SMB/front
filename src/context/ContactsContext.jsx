/* ⚛ REACT */
import React, { createContext, useState, useEffect} from 'react';
import { useSocket } from '../hooks/useSocket';

const ContactsContext = createContext();

const ContactsProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const { socketData, sendMessage} = useSocket();
    
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
            console.log("contacts:", formattedUsers)
        }
    }, [socketData]);

  return (
    <ContactsContext.Provider value={{ 
      contacts, 
    }}>
      {children}
    </ContactsContext.Provider>
  );
};

export { ContactsContext, ContactsProvider };