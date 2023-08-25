// useTableState.js
import { useState } from "react";

export function useTableState() {
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToEdit, setIdToEdit] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);

  return {
    idToDelete,
    setIdToDelete,
    idToEdit,
    setIdToEdit,
    dataToEdit,
    setDataToEdit,
  };
}
