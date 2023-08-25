import React from "react";

import { ModalLayout, ModalHeader, ModalBody, ModalFooter, Typography, Button } from "@strapi/design-system";
import { useModal } from "../../utils/contexts/ModalContext";
export default function CustomModal({ children, handleSubmit, setIdToEdit }) {
  const { setShowModal } = useModal();
  return (
    <ModalLayout
      onClose={() => {
        setShowModal(false);
        setIdToEdit && setIdToEdit(null);
      }}
      labelledBy="title"
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
        setShowModal(false);
        setIdToEdit && setIdToEdit(null);
      }}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {setIdToEdit ? "Edit entry" : "Add entry"}
        </Typography>
      </ModalHeader>

      <ModalBody style={{ display: "flex", flexDirection: "column", gap: "24px" }}>{children}</ModalBody>

      <ModalFooter
        startActions={
          <Button
            onClick={() => {
              setShowModal(false);
              setIdToEdit && setIdToEdit(null);
            }}
            variant="tertiary"
          >
            Cancel
          </Button>
        }
        endActions={<Button type="submit">{setIdToEdit ? "Edit entry" : "Add entry"}</Button>}
      />
    </ModalLayout>
  );
}
