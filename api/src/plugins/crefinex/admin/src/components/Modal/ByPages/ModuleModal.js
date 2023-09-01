import React from "react";
import CustomModal from "../CustomModal";

import { TextInput, SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { Controller } from "react-hook-form";
import { useCustomMutation, useModal } from "../../../utils/";

import { useQuery } from "@tanstack/react-query";
import { queryWorlds } from "../../../graphql/queries/world.queries";
import { query } from "../../../graphql/client/GraphQLCLient";
import { QUERY_KEYS } from "../../../constants/queryKeys.constants";

const ORDER_INPUTS_TO_SHOW = 20;

export default function ModuleModal({ mainAction }) {
  const { idToEdit: editId, setIdToEdit, dataToEdit: defaultValues } = useModal();
  const { control, mutate, handleSubmit } = useCustomMutation(QUERY_KEYS.modules, mainAction, defaultValues);
  const { data, isLoading, error } = useQuery([QUERY_KEYS.worlds], () => query(queryWorlds));

  const onSubmit = handleSubmit((values) => {
    const data = {
      description: values.description,
      order: parseFloat(values.order),
      world: values.world,
      publishedAt: new Date(),
    };

    editId ? mutate({ id: editId, data: { ...data } }) : mutate({ data: { ...data } });
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
      {isLoading && !error ? null : (
        <Controller
          name="world"
          control={control}
          render={({ field }) => {
            const { crefinexWorlds } = data;
            return (
              <SingleSelect {...field} placeholder="Select the world of this module" label="World">
                {crefinexWorlds.data.map((world) => (
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
        rules={{ valueAsNumber: true }}
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
