/* ⚛ REACT */
import React, { createContext, useState } from 'react';


const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    modalType: null,
    payload: null,
  });

  const openModal = (modalType, payload = null) => {
    setModal({ isOpen: true, modalType, payload });
  };

  const closeModal = () => {
    setModal({ isOpen: false, modalType: null, payload: null });
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
