import React, { useState } from "react";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
  Loader,
  Flex,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@strapi/design-system";

import { ExclamationMarkCircle, Trash, CheckCircle } from "@strapi/icons";
export function ConfirmationDialog({
  setShowDialog,
  setShowModal,
  handleSubmit,
}) {
  return (
    <Dialog
      onClose={() => setShowDialog(false)}
      title="Confirmation"
      isOpen={setShowDialog}
    >
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Flex direction="column" alignItems="center" gap={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">
              Are you sure you want to create this lesson?
            </Typography>
          </Flex>
        </Flex>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={() => setShowDialog(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endAction={
          <Button
            variant="success-light"
            startIcon={<CheckCircle />}
            type="submit"
            onClick={() => {
              handleSubmit();
              setShowModal(false);
            }}
          >
            Confirm
          </Button>
        }
      />
    </Dialog>
  );
}
export function DeleteDialog({
  setShowDialog,
  handleDelete,
  idToDelete,
  setShowModal,
}) {
  const handleConfirm = async () => {
    try {
      await handleDelete(idToDelete);
      setShowDialog(null);
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <Dialog
      onClose={() => setShowDialog(null)}
      title="Confirmation"
      isOpen={setShowDialog !== null}
    >
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Flex direction="column" alignItems="center" gap={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">
              Are you sure you want to delete this lesson?
            </Typography>
          </Flex>
        </Flex>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={() => setShowDialog(null)} variant="tertiary">
            Cancel
          </Button>
        }
        endAction={
          <Button
            variant="danger"
            startIcon={<Trash />}
            type="submit"
            onClick={() => handleConfirm()}
          >
            Confirm
          </Button>
        }
      />
    </Dialog>
  );
}
