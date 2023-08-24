import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const useCustomMutation = (queryKey, queryFunction, defaultValues, extraFunctions) => {
  if (defaultValues === undefined || defaultValues === null) {
    defaultValues = {};
  }
  const singularKey = (queryKey) => {
    if (queryKey.endsWith("ies")) {
      return queryKey.replace(/ies$/, "y");
    }
    if (queryKey.endsWith("s")) {
      return queryKey.replace(/s$/, "");
    }
    if (queryKey.endsWith("es")) {
      return queryKey.replace(/es$/, "e");
    }
  };

  const { control, handleSubmit } = useForm({ defaultValues: defaultValues });
  const queryClient = useQueryClient();
  const mutate = useMutation(queryFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);

      if (extraFunctions.alert !== undefined) {
        extraFunctions.alert.show("success", `${singularKey(queryKey)} created`);
      }
      // extraFunctions.setShowModal(false);
    },
    onError: () => {
      if (extraFunctions.alert !== undefined) {
        extraFunctions.alert.show("error", `there was an error creating a ${singularKey(queryKey)}`);
      }
      // extraFunctions.setShowModal(false);
    },
  });

  return {
    control,
    mutate: mutate.mutate,
    handleSubmit,
  };
};
