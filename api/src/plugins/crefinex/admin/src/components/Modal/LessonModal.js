import React from "react";

import { TextInput, SingleSelect, SingleSelectOption } from "@strapi/design-system";
import CustomModal from "./CustomModal";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ORDER_INPUTS_TO_SHOW = 20;

export default function LessonModal({ actions, data, moduleId }) {
  const { control, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  console.log(actions);
  const mutate = useMutation(actions.actionsAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("lessons");
      actions.alert.show("success", "Lesson created");
      actions.setShowModal(false);
    },
    onError: () => {
      actions.alert.show("error", "Error creating Lesson");
      actions.setShowModal(false);
    },
  });

  const onSubmit = handleSubmit((formData) => {
    mutate.mutate({ data: { ...formData, module: moduleId, world: data.world.id } });
  });

  return (
    <CustomModal actions={actions} handleSubmit={onSubmit}>
      <Controller
        name="description"
        control={control}
        render={({ field }) => {
          return (
            <TextInput {...field} placeholder="Add a description here" label="Description" name="description" hint="Max 40 characters" />
          );
        }}
      />

      <Controller
        name="order"
        control={control}
        render={({ field }) => {
          return (
            <SingleSelect label="Order" placeholder="Select" {...field}>
              {Array(ORDER_INPUTS_TO_SHOW)
                .fill(0)
                .map((_, index) => (
                  <SingleSelectOption key={index} value={index + 1}>
                    {index + 1}
                  </SingleSelectOption>
                ))}
            </SingleSelect>
          );
        }}
      ></Controller>
    </CustomModal>
  );
}
