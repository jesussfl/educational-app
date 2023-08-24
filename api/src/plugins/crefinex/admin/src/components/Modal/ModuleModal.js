import React from "react";

import { TextInput, SingleSelect, SingleSelectOption } from "@strapi/design-system";
import CustomModal from "./CustomModal";
import { Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useCustomMutation } from "./useCustomMutation";
import worldActionsAPI from "../../api/world/services/worldServices";

const ORDER_INPUTS_TO_SHOW = 20;

export default function ModuleModal({ mainAction, extraActions, defaultValues, editId }) {
  const { control, mutate, handleSubmit } = useCustomMutation("modules", mainAction, defaultValues, extraActions);
  const { data: worlds, isLoading, error } = useQuery(["worlds"], () => worldActionsAPI.getAll());

  const onSubmit = handleSubmit((data) => {
    const id = editId;

    id ? mutate({ id, data: { ...data } }) : mutate({ data: { ...data } });
  });

  return (
    <CustomModal open={extraActions.setShowModal} handleSubmit={onSubmit} isEdit={editId}>
      <Controller
        name="description"
        control={control}
        render={({ field }) => {
          return (
            <TextInput {...field} placeholder="Add a description here" label="Description" name="description" hint="Max 40 characters" />
          );
        }}
      />
      {isLoading && !error ? null : (
        <Controller
          name="world"
          control={control}
          render={({ field }) => {
            return (
              <SingleSelect {...field} placeholder="Select the world of this module" label="World">
                {worlds.data.map((world) => (
                  <SingleSelectOption key={world.id} value={world.id}>{`${world.id} - ${world.attributes.name}`}</SingleSelectOption>
                ))}
              </SingleSelect>
            );
          }}
        ></Controller>
      )}

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
