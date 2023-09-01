import React from "react";

import { ModalLayout, ModalHeader, ModalBody, ModalFooter, Typography, Button } from "@strapi/design-system";
import { useModal } from "../../utils/contexts/ModalContext";
export default function CustomModal({ children, handleSubmit }) {
  const { setShowModal, setIdToEdit, setDataToEdit, idToEdit } = useModal();
  return (
    <ModalLayout
      onClose={() => {
        setIdToEdit(null);
        setDataToEdit(null);
        setShowModal(false);
      }}
      labelledBy="title"
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
        setDataToEdit(null);
        setIdToEdit(null);
        setShowModal(false);
      }}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {idToEdit ? "Edit entry" : "Add entry"}
        </Typography>
      </ModalHeader>

      <ModalBody style={{ display: "flex", flexDirection: "column", gap: "24px" }}>{children}</ModalBody>

      <ModalFooter
        startActions={
          <Button
            onClick={() => {
              setIdToEdit(null);
              setDataToEdit(null);
              setShowModal(false);
            }}
            variant="tertiary"
          >
            Cancel
          </Button>
        }
        endActions={<Button type="submit">{idToEdit ? "Edit entry" : "Add entry"}</Button>}
      />
    </ModalLayout>
  );
}
