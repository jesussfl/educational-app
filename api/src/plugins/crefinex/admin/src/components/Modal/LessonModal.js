import React, { useState } from "react";

import { ModalLayout, ModalHeader, ModalBody, ModalFooter, Typography, Button, TextInput, Loader, Flex } from "@strapi/design-system";
import { ConfirmationDialog } from "./Dialog/CustomDialogs";
export default function LessonModal({ setShowModal, moduleID, createLesson, moduleData }) {
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  console.log(moduleData, "moduleData");
  const handleSubmit = async () => {
    try {
      await createLesson({
        data: {
          description: description,
          order: order,
          module: moduleID,
          world: moduleData.attributes.world.data.id,
        },
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <>
      {showConfirmDialog ? (
        <ConfirmationDialog setShowDialog={setShowConfirmDialog} setShowModal={setShowModal} handleSubmit={handleSubmit} />
      ) : (
        <ModalLayout onClose={() => setShowModal(false)} labelledBy="title" as="form" onSubmit={handleSubmit}>
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
              Add a lesson
            </Typography>
          </ModalHeader>
          <ModalBody>
            <TextInput
              // @ts-ignore
              placeholder="Add a description here"
              label="Description"
              name="description"
              hint="Max 40 characters"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <TextInput
              // @ts-ignore
              placeholder="Add the order of this lesson"
              label="Order"
              name="order"
              hint="Max 40 characters"
              onChange={(e) => setOrder(e.target.value)}
              value={order}
            />
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={() => setShowModal(false)} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={<Button onClick={() => setShowConfirmDialog(true)}>Add Lesson</Button>}
          />
        </ModalLayout>
      )}
    </>
  );
}
