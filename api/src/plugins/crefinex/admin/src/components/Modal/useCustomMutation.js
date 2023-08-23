import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

//I want to use this hook like this
// const {control, handleSubmit} = useCustomMutation(queryKey, queryFunctions, mutationType, defaultValues);
const MUTATION_TYPES = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
};
export const useCustomMutation = (queryKey, queryFunction, defaultValues, extraFunctions) => {
  if (defaultValues === undefined || defaultValues === null) {
    defaultValues = {};
  }

  const { control, handleSubmit } = useForm({ defaultValues: defaultValues });
  const queryClient = useQueryClient();
  const mutate = useMutation(queryFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);

      if (extraFunctions.alert !== undefined) {
        extraFunctions.alert.show("success", "entry created");
      }
      extraFunctions.setShowModal(false);
    },
    onError: () => {
      if (extraFunctions.alert !== undefined) {
        extraFunctions.alert.show("success", "entry created");
      }
      extraFunctions.setShowModal(false);
    },
  });

  return {
    control,
    mutate: mutate.mutate,
    handleSubmit,
  };
};
