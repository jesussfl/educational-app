import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextInput, SingleSelect, SingleSelectOption } from "@strapi/design-system";
import {  Plus } from "@strapi/icons";
import CustomModal from "./CustomModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function ExercisesModal({ actions, lessonId }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const mutate = useMutation(actions.actionsAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("exercises");
      actions.alert.show("success", "Lesson created");
      actions.setShowModal(false);
    },
    onError: () => {
      actions.alert.show("error", "Error creating Lesson");
      actions.setShowModal(false);
    },
  });

  const [options, setOptions] = useState([]);

  const onSubmit = handleSubmit((data) => {

    const exercise = {
      data: {
        lesson: lessonId,
        content: null,
        type: data.type,
        order: data.order,
      },
    };
    if (watch("type") === "Completion") {
      exercise.data.content = loadCompletionSentence(data.completionText);
    }

    if (watch("type") === "Memory") {
      exercise.data.content = JSON.stringify(data.memoryWords);
    }
    if (watch("type") === "selection") {
      // exercise.data.content = JSON.stringify({ options: options });
    }
    console.log(exercise);
    mutate.mutate(exercise);
  });

  const loadCompletionSentence = (sentence) => {
    const regex = /\{([^}]+)\}/g;
    const words = [];
    let match;
    console.log(sentence);
    while ((match = regex.exec(sentence)) !== null) {
      words.push(match[1]);
    }
    return JSON.stringify({
      template: sentence,
      words,
    });
  };
  const renderExerciseFields = () => {
    if (watch("type") === "Completion") {
      return (
        <>
          <Controller
            name="completionText"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Add the sentence here"
                label="Completion Sentence"
                name="completionSentence"
                hint="close with curly brackets the words you want to be filled in the exercise"
              />
            )}
          ></Controller>
        </>
      );
    } else if (watch("type") === "Memory") {
      return (
        <>
          <Controller
            name="memoryWords"
            control={control}
            render={({ field }) => (
              <TextInput {...field} placeholder="Type the words you want to be in the memory exercise" label="Memory Words" hint="Press enter after each word" />
            )}
          ></Controller>
        </>
      );
    } else if (watch("type") === "selection") {
      return (
        <>
          <Button variant="secondary" startIcon={<Plus />} onClick={addOption}>
            Add an option
          </Button>
          {options.map((option, index) => (
            <div key={index}>
              <TextInput
                placeholder={`Enter the text of option ${index + 1}`}
                label={`Option ${index + 1}`}
                name={`optionText${index}`}
                value={option.text}
                onChange={(e) => handleOptionChange(e, index)}
              />
              <Button variant="danger" onClick={() => removeOption(index)}>
                Remove
              </Button>
            </div>
          ))}
        </>
      );
    }
    return null;
  };

  const addOption = () => {
    setOptions([...options, { text: "", image: null }]);
  };
  const handleOptionChange = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = e.target.value;
    setOptions(updatedOptions);
  };
  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };
  return (
    <CustomModal actions={actions} handleSubmit={onSubmit}>
      <Controller
        name="type"
        control={control}
        render={({ field }) => {
          return (
            <SingleSelect {...field} placeholder="Select the type of the exercise">
              <SingleSelectOption value="Completion">Completion</SingleSelectOption>
              <SingleSelectOption value="Memory">Memory</SingleSelectOption>
              <SingleSelectOption value="selection">Simple Selection</SingleSelectOption>
            </SingleSelect>
          );
        }}
      ></Controller>
      <Controller
        name="order"
        control={control}
        render={({ field }) => {
          return (
            <SingleSelect {...field} placeholder="Select the order">
              <SingleSelectOption value="1">1</SingleSelectOption>
              <SingleSelectOption value="2">2</SingleSelectOption>
              <SingleSelectOption value="3">3</SingleSelectOption>
            </SingleSelect>
          );
        }}
      ></Controller>

      {renderExerciseFields()}
    </CustomModal>
  );
}
