/* ⚛ REACT */
import { useState, useContext, useEffect } from "react";

/* 🧠 CONTEXT */
import { ModalContext } from '../../context/ModalContext';
import { MessageContext } from '../../context/MessageContext';

/* 📁 ASSETS */
import { add, person, remove, search } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, AddIcon, PersonIcon, AddOrRemoveIcon, SearchIcon } from "./styles";

/* 🔗 SERVICE */
import { useSocket } from '../../hooks/useSocket';

const Add = () => {

    const { closeModal } = useContext(ModalContext);
    const { showMessage } = useContext(MessageContext);

    const { sendMessage, socketData } = useSocket();

    const [isLoading, setIsLoading] = useState(false);
    const [isPlusIcon, setIsPlusIcon] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [selected, setSelected] = useState([]);
    const [searchUser, setSearchUser] = useState('');

    let user_id = localStorage.getItem("user_id");

    useEffect(() => {
        handleGetAllUsers();
    }, []);

    useEffect(() => {
        if (socketData) {
           const formattedUsers = socketData.users?.map(user => ({
            id: user.ID,
            name: user.Name,
            username: user.Username,
            email: user.Email,
          }));
          setContacts(formattedUsers);
        }
    }, [socketData]);

    const filteredUsers = contacts?.filter((contact) =>
        contact?.username?.toLowerCase().includes(searchUser.toLowerCase())
    );

    const handleGetAllUsers = () => {
        sendMessage(JSON.stringify({
            channel: "user",
            method: "GET-all",
        }));
    }

    const handleChange = (index) => {
      setIsPlusIcon(!isPlusIcon);
      if (selected.includes(index)) {
        setSelected([]);
      } else {
        setSelected([index]);
      }
    }  

    const handleSubmit = () => {
      setIsLoading(true);
      if (selected.length > 0) {
        sendMessage(JSON.stringify({
          channel: "user",
          method: "PATCH",
          _id: user_id,
          newContact_id: selected[0],
        }));
        showMessage('success', 'Contact added successfully!');
      } else {
        showMessage('error', 'No contacts were added');
      }
      closeModal();
      setIsLoading(false);
    }

    return (
        <Container>
            <h1>Add Contact</h1>
            <div className="input-container">
                <SearchIcon src={search} />
                <input type="text" onChange={e => setSearchUser(e.target.value)} placeholder="Search user"/>
            </div>
            <ul>
                <h3>Users List</h3>
                {filteredUsers?.map(contact => (
                    <li key={contact.id}>
                        <PersonIcon src={person} />
                        <div className="contact-info">
                            <span>{contact.username}</span>
                            <AddOrRemoveIcon src={selected.includes(contact.id) ? remove : add} onClick={() => handleChange(contact.id)}/>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => handleSubmit()} disabled={isLoading}>
                <AddIcon src={add} />
                {isLoading ? "Adding..." : "Add"}
            </button>
        </Container>
    );
}

export default Add;