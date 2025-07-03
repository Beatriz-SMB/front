/* ⚛ REACT */
import { useRef, useState, useContext, useEffect } from "react";

/* 📦 LIBS */
import { useNavigate } from "react-router";

/* 🔗 SERVICE */
import { useSocket } from '../../hooks/useSocket';

/* 🧠 CONTEXT */
import { MessageContext } from '../../context/MessageContext';

/* 📁 ASSETS*/
import { register } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, Link, RegisterIcon } from "./styles";

/* 🔧 UTILS */
import { validateEmail, validateUsername, validateName } from '../../utils/validation';

const Register = () => {

    document.title = "Register";

    let navigate = useNavigate();

    const { showMessage } = useContext(MessageContext);

    const { sendMessage } = useSocket();

    const usernameRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (validateUsername(usernameRef.current.value) && validateName(nameRef.current.value) && validateEmail(emailRef.current.value)) {
            console.log('passou em tudo')
            sendMessage(JSON.stringify({
                channel: "user",
                method: "POST",
                name: nameRef.current.value,
                username: usernameRef.current.value,
                email: emailRef.current.value,
            }));
            navigate("/join");
            showMessage('success', 'Successfully registered user!'); 
        } else {
            showMessage('error', 'Invalid user'); 
        }
        setIsLoading(false);
    }

    return(
        <Container>
            <h1>Register</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label htmlFor="username">User Name</label>
                    <input type="text" aria-label="User Name" ref={usernameRef} />
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" aria-label="Name" ref={nameRef} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" aria-label="Email" ref={emailRef} />
                </div>
                <Link to="/join">Already have an account?</Link>
                <button type="submit">
                    {isLoading ? 'Registering...' : 'Register'}
                    <RegisterIcon src={register} />
                </button>
            </form>
        </Container>
    );
}

export default Register;