/* ⚛ REACT */
import { useContext } from "react";

/* 🧠 CONTEXT */
import { MessageContext } from '../../context/MessageContext';

/* 📁 ASSETS */
import { error, success, warning } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, MessageIcon} from "./styles";

const Message = () => {
    const { messages } = useContext(MessageContext);

    const iconMap = {
        warning: warning,
        error: error,
        success: success,
    };

    return(
        <Container>
        {messages.map((message) => (
            <li key={message.id} type={message.type}>
                <MessageIcon src={iconMap[message.type]} alt={message.type} />
                <span>{message.content}</span>
            </li>
        ))}
        </Container>
    );
}

export default Message;