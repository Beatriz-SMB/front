/* ⚛ REACT */
import { useState, useEffect, useContext, useRef } from "react";

/* 🧠 CONTEXT */
import { ModalContext } from '../../context/ModalContext';
import { MessageContext } from '../../context/MessageContext';

/* 📁 ASSETS */
import { person, add, remove } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, AddIcon, AddOrRemoveIcon, PersonIcon } from "./styles";

/* 🔗 SERVICE */
import { useSocket } from '../../hooks/useSocket';
import { validateGroupName } from "../../utils/validation";
import { useReload } from "../../context/ReloadChatsContext";

const Create = () => {

    const { closeModal } = useContext(ModalContext);
    // const { showMessage } = useContext(MessageContext);

    const { sendMessage, socketData } = useSocket();
    const { setReloadGroups } = useReload();

    const [contacts, setContacts] = useState([]);
    const [isPlusIcon, setIsPlusIcon] = useState(true);
    const [selected, setSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const groupnameRef = useRef(null);

    let user_id = localStorage.getItem("user_id");

    useEffect(() => {
        handleGetContacts();
    }, []);

    useEffect(() => {
        if (socketData?.contacts) {
           const formattedUsers = socketData.contacts?.map(user => ({
            id: user._id,
            username: user.username,
          }));

          setContacts(formattedUsers);
        } else {
          setContacts([]);
        }
    }, [socketData]);

    const handleGetContacts = () => {
      sendMessage(JSON.stringify({
        channel: "user",
        method: "GET-contacts",
        _id: user_id,
      }));
    }

    const handleAddNewChat = (groupName) => {
      sendMessage(JSON.stringify({
        channel: "chat",
        method: "POST",
        type: "group",
        name: groupName,
        members: selected, 
      }));
    }

    const handleChange = (username) => {
      setIsPlusIcon(!isPlusIcon);
      if (selected.includes(username)) {
        setSelected(selected.filter((i) => i !== username));
      } else {
        setSelected([...selected, username]); 
      }
    }  

    const handleSubmit = () => {
        setIsLoading(true);
        if (validateGroupName(groupnameRef.current.value) && selected.length > 0) {
          handleAddNewChat(groupnameRef.current.value);
          setReloadGroups(true); 
          // showMessage('success', 'Group created successfully!');
        } else {
          // showMessage('error', 'Error creating group.');
        }
        // closeModal();
        setIsLoading(false);
    }

    return (
        <Container>
            <h1>Create Group</h1>
            <div className="input-container">
                <label htmlFor="group-name">Group Name</label>
              <input type="text" id="group-name" aria-label="Group Name" ref={groupnameRef} />
            </div>
            <ul>
                <h3>Contact List</h3>
                {contacts.length > 0 && 
                  contacts.map(contact => (
                    <li key={contact.id}>
                        <PersonIcon src={person} />
                        <div className="contact-info">
                            <span>{contact.username}</span>
                            <AddOrRemoveIcon src={selected.includes(contact.username) ? remove : add} onClick={() => handleChange(contact.username)}/>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => handleSubmit()} disabled={isLoading}>
                <AddIcon src={add} />
                {isLoading ? "Creating..." : "Create"}
            </button>
        </Container>
    );
}

export default Create;