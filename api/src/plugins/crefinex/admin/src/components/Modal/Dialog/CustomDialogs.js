import React from "react";

import { Typography, Button, Flex, Dialog, DialogBody, DialogFooter } from "@strapi/design-system";

import { ExclamationMarkCircle, Trash, CheckCircle } from "@strapi/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
export function DeleteDialog({ showDialog, actions, idToDelete, section }) {
  const queryClient = useQueryClient();
  const mutate = useMutation(actions.actionsAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(section);
      actions.alert.show("success", "entry deleted");
      showDialog(null);
    },
    onError: () => {
      actions.alert.show("error", "Error deleting entry");
      showDialog(null);
    },
  });

  const onSubmit = () => {
    mutate.mutate(idToDelete);
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
