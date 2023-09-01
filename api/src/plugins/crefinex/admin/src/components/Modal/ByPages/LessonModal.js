import React from "react";
import CustomModal from "../CustomModal";

import { TextInput, SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { Controller } from "react-hook-form";
import { useCustomMutation, useModal } from "../../../utils/";

import { QUERY_KEYS } from "../../../constants/queryKeys.constants";

const ORDER_INPUTS_TO_SHOW = 20;

export default function LessonModal({ sectionInfo, sectionId, mainAction }) {
  const { idToEdit, setIdToEdit, dataToEdit: defaultValues } = useModal();
  const { control, mutate, handleSubmit } = useCustomMutation(QUERY_KEYS.lessons, mainAction, defaultValues);

  const onSubmit = handleSubmit((values) => {
    const data = {
      description: values.description,
      order: parseFloat(values.order),
      section: sectionId,
      world: sectionInfo.world.data.id,
      publishedAt: new Date(),
    };

    idToEdit ? mutate({ id: idToEdit, data: { ...data } }) : mutate({ data: { ...data } });
  });

  return (
    <CustomModal handleSubmit={onSubmit} setIdToEdit={setIdToEdit}>
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
