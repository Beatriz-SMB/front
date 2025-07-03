/* ⚛ REACT */
import { useContext } from "react";

/* 🧠 CONTEXT */
import { MessageContext } from '../../context/MessageContext';

/* 📁 ASSETS*/
import { trash, edit } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, ButtonIcon } from "./styles";

const Dropdown = ({ onClick, onClose }) => {

    const { showMessage } = useContext(MessageContext);

    const handleRemove = () => {
        onClick();
        onClose(); 
        showMessage('success', 'Chat removed successfully!');
    }

    // const handleEdit = () => {
    //     console.log(`Editing chat with ID: ${chatId}`);
    //     onClose();
    //     showMessage('warning', 'No chat selected for editing!');
    // }

    return (
        <Container>
            <button onClick={() => handleRemove()}> 
                <ButtonIcon src={trash} alt="Remove Icon"/>
                Remover
            </button>
            {/* <button onClick={() => handleEdit()}>
                <ButtonIcon src={edit} alt="Remove Icon"/>
                Editar
            </button> */}
        </Container>
    )
}

export default Dropdown;