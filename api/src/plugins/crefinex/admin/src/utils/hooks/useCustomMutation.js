import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAlerts } from "../contexts/AlertsContext";
export const useCustomMutation = (queryKey, queryFunction, defaultValues) => {
  if (defaultValues === undefined || defaultValues === null) {
    defaultValues = {};
  }

  const { showAlert } = useAlerts();
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

  const { control, handleSubmit, watch } = useForm({ defaultValues: defaultValues });
  const queryClient = useQueryClient();
  const mutate = useMutation(queryFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      showAlert("success", `${singularKey(queryKey)} created`);
    },
    onError: () => {
      showAlert("error", `there was an error creating a ${singularKey(queryKey)}`);
    },
  });

  return {
    control,
    mutate: mutate.mutate,
    handleSubmit,
    watch,
  };
};
