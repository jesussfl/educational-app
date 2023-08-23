import React from "react";

import { TextInput, SingleSelect, SingleSelectOption } from "@strapi/design-system";
import CustomModal from "./CustomModal";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ORDER_INPUTS_TO_SHOW = 20;

export default function ModuleModal({ actions, data }) {
  const { control, handleSubmit } = useForm();
  const queryClient = useQueryClient();

  const mutate = useMutation(actions.actionsAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("modules");
      actions.alert.show("success", "Module created");
      actions.setShowModal(false);
    },
    onError: () => {
      actions.alert.show("error", "Error creating Module");
      actions.setShowModal(false);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate.mutate({ data: { ...data } });
  });

  return (
    <CustomModal actions={actions} handleSubmit={onSubmit}>
      <Controller
        name="description"
        control={control}
        render={({ field }) => {
          return <TextInput {...field} placeholder="Add a description here" label="Description" name="description" hint="Max 40 characters" />;
        }}
      />
      <Controller
        name="world"
        control={control}
        render={({ field }) => {
          return (
            <SingleSelect {...field} placeholder="Select the world of this module" label="World">
              {data.map((world) => (
                <SingleSelectOption key={world.id} value={world.id}>{`${world.id} - ${world.attributes.name}`}</SingleSelectOption>
              ))}
            </SingleSelect>
          );
        }}
      ></Controller>

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
