import React from "react";

import { TextInput, SingleSelect, SingleSelectOption } from "@strapi/design-system";
import CustomModal from "./CustomModal";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useCustomMutation } from "./useCustomMutation";
import worldActionsAPI from "../../api/world/services/worldServices";

const ORDER_INPUTS_TO_SHOW = 20;

export default function ModuleModal({ actions, data, actionType }) {
  const { control, mutate, handleSubmit } = useCustomMutation("modules", actions.actionsAPI[actionType], data, actions);
  const { data: worlds, isLoading, error } = useQuery(["worlds"], () => worldActionsAPI.getAll());

  const onSubmit = handleSubmit((data) => {
    mutate(20, { data: { ...data } });
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
      {isLoading ? null : (
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
