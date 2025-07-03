/* ⚛ REACT */
import React, { useContext } from 'react';

/* 🧩 COMPONENTS */
import Add from '../add';
import Create from '../create';

/* 🧠 CONTEXT */
import { ModalContext } from '../../context/ModalContext';

/* 📁 ASSETS */
import { close } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, CloseIcon } from "./styles";

const MODAL_COMPONENTS = {
    ADD: Add,
    CREATE: Create,
};
  
const DefaultModal = () => <p>Modal inválido</p>;

const Modal = () => {

    const { modal, closeModal } = useContext(ModalContext);

    if (!modal.isOpen) return null;
    
    const Component = MODAL_COMPONENTS[modal.modalType] || DefaultModal;

    return(
        <Container onClick={() => closeModal()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <CloseIcon src={close} fill={'#403D39'} onClick={() => closeModal()}/>
                <Component {...modal.payload} closeModal={closeModal} />
            </div>
        </Container>
    );
}

export default Modal;