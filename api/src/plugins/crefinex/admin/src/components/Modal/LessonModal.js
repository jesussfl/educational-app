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
import { ConfirmationDialog } from "./Dialog/CustomDialogs";
export default function LessonModal({
  setShowModal,
  moduleID,
  createLesson,
  lessonData,
}) {
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const handleSubmit = async (e) => {
    setIsLoading(true);
    // // Prevent submitting parent form
    // e.preventDefault();
    // e.stopPropagation();
    console.log(lessonData);
    try {
      await createLesson({
        data: {
          description: description,
          order: order,
          module: moduleID,
          world: lessonData[0].attributes.module.data.attributes.world.data.id,
        },
      });
      setIsLoading(false);
    } catch (e) {
      console.log("error", e);
    }
  };
  const getError = () => {
    // Form validation error

    if (description.length > 40) {
      return "Content is too long";
    }

    return null;
  };

  if (isLoading)
    return (
      <Flex
        style={{
          Flex: 1,
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Loader>Loading...</Loader>
      </Flex>
    );

  return (
    <>
      {showConfirmDialog ? (
        <ConfirmationDialog
          setShowDialog={setShowConfirmDialog}
          setShowModal={setShowModal}
          handleSubmit={handleSubmit}
        />
      ) : (
        <ModalLayout
          onClose={() => setShowModal(false)}
          labelledBy="title"
          as="form"
          onSubmit={handleSubmit}
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Add a lesson
            </Typography>
          </ModalHeader>
          <ModalBody>
            <TextInput
              placeholder="Add a description here"
              label="Description"
              name="description"
              hint="Max 40 characters"
              error={getError()}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <TextInput
              placeholder="Add the order of this lesson"
              label="Order"
              name="order"
              hint="Max 40 characters"
              error={getError()}
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
            endActions={
              <Button onClick={() => setShowConfirmDialog(true)}>
                Add Lesson
              </Button>
            }
          />
        </ModalLayout>
      )}
    </>
  );
}
