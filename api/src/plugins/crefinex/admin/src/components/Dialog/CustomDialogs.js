import React from "react";

import { Typography, Button, Flex, Dialog, DialogBody, DialogFooter } from "@strapi/design-system";

import { ExclamationMarkCircle, Trash, CheckCircle } from "@strapi/icons";
import { useModal } from "../../utils/contexts/ModalContext";
import { useCustomMutation } from "../../utils/hooks/useCustomMutation";
export function ConfirmationDialog({ setShowDialog, setShowModal, handleSubmit }) {
  return (
    <Dialog onClose={() => setShowDialog(false)} title="Confirmation" isOpen={setShowDialog}>
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Flex direction="column" alignItems="center" gap={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">Are you sure you want to create this lesson?</Typography>
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
export function DeleteDialog({ mainAction, section }) {
  const { mutate } = useCustomMutation(section, mainAction);
  const { setIdToDelete: showDialog, idToDelete } = useModal();
  const onSubmit = () => {
    mutate({ id: idToDelete });
    showDialog(null);
  };
  return (
    <Dialog onClose={() => showDialog(null)} title="Confirmation" isOpen={showDialog !== null}>
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Flex direction="column" alignItems="center" gap={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">Are you sure you want to delete this lesson?</Typography>
          </Flex>
        </Flex>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={() => showDialog(null)} variant="tertiary">
            Cancel
          </Button>
        }
        endAction={
          <Button variant="danger" startIcon={<Trash />} type="submit" onClick={onSubmit}>
            Confirm
          </Button>
        }
      />
    </Dialog>
  );
}
