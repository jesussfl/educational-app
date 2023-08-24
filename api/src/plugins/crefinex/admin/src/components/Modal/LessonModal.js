import React from "react";

import { TextInput, SingleSelect, SingleSelectOption } from "@strapi/design-system";
import CustomModal from "./CustomModal";
import { Controller } from "react-hook-form";
import { useCustomMutation } from "./useCustomMutation";
const ORDER_INPUTS_TO_SHOW = 20;
const QUERY_KEY = "lessons"
export default function LessonModal({ data, moduleId, mainAction, extraActions, defaultValues, editId }) {

  const { control, mutate, handleSubmit } = useCustomMutation(QUERY_KEY, mainAction, defaultValues, extraActions);
  console.log(data)
  const onSubmit = handleSubmit((formData) => {
    const id = editId;
    id ? mutate({ id, data: { ...formData, module: moduleId, world: data.world.id } }) : mutate({ data: { ...formData, module: moduleId, world: data.world.id } });
  });

  return (
    <CustomModal handleSubmit={onSubmit} setIdToEdit={extraActions.setIdToEdit}>
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
