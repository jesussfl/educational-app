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

//This hooks provides the context
//is important to clean the states after close the modal!
export const useModal = () => {
  return useContext(ModalContext);
};
