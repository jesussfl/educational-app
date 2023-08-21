import React from "react";

import { ModalLayout, ModalHeader, ModalBody, ModalFooter, Typography, Button } from "@strapi/design-system";

export default function CustomModal({ actions, children, data }) {
  return (
    <ModalLayout
      onClose={() => actions.setShowModal(false)}
      labelledBy="title"
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        actions.entryActions.createEntry(data);
      }}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add entry
        </Typography>
      </ModalHeader>

      <ModalBody style={{ display: "flex", flexDirection: "column", gap: "24px" }}>{children}</ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => actions.setShowModal(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">Add entry</Button>}
      />
    </ModalLayout>
  );
}
