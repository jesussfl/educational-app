// ModalContext.js
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal, idToEdit, setIdToEdit, dataToEdit, setDataToEdit, idToDelete, setIdToDelete }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
