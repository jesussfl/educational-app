import React from "react";

import { ModalLayout, ModalHeader, ModalBody, ModalFooter, Typography, Button } from "@strapi/design-system";

export default function CustomModal({ open, children, handleSubmit, isEdit }) {
  return (
    <ModalLayout
      onClose={() => open(false)}
      labelledBy="title"
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {isEdit ? "Edit entry" : "Add entry"}
        </Typography>
      </ModalHeader>

      <ModalBody style={{ display: "flex", flexDirection: "column", gap: "24px" }}>{children}</ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => open(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">{isEdit ? "Edit entry" : "Add entry"}</Button>}
      />
    </ModalLayout>
  );
}
