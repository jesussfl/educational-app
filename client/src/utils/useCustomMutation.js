import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { query } from "./graphql/client/GraphQLCLient";
export const useCustomMutation = (queryKey, queryFunction, defaultValues) => {
	defaultValues = defaultValues || {};

	const { control, handleSubmit, watch } = useForm({ defaultValues: defaultValues });
	const [mutationData, setMutationData] = useState();
	const queryClient = useQueryClient();

	const mutate = useMutation(async (payload) => await query(queryFunction, { ...payload }), {
		onSuccess: (data) => {
			queryClient.invalidateQueries(queryKey);
			setMutationData(data);
			console.log("success");
		},
		onError: () => {
			console.log("error");
		},
	});

	return {
		control,
		mutate: mutate.mutate,
		handleSubmit,
		watch,
		mutationData,
	};
};
