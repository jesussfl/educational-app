import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextInput, SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import CustomModal from "./CustomModal";
export default function ExercisesModal({ actions, id }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [type, setType] = useState();
  const [order, setOrder] = useState();
  const [completionSentenceData, setCompletionSentenceData] = useState();
  const [content, setContent] = useState({});
  const [words, setWords] = useState([]);
  const [options, setOptions] = useState([]);
  const lesson = id;
  console.log(watch("help"));
  const loadCompletionSentence = (sentence) => {
    const regex = /\{([^}]+)\}/g;
    const words = [];
    let match;

    while ((match = regex.exec(sentence)) !== null) {
      words.push(match[1]);
    }
    const data = JSON.stringify({
      template: sentence,
      words,
    });
    setContent(data);
  };
  const renderExerciseFields = () => {
    if (type === "Completion") {
      return (
        <>
          <TextInput
            placeholder="Add the sentence here"
            label="Completion Sentence"
            name="completionSentence"
            hint="close with curly brackets the words you want to be filled in the exercise"
            onChange={(e) => {
              setCompletionSentenceData(e.target.value);
            }}
            onBlur={() => loadCompletionSentence(completionSentenceData)}
            value={completionSentenceData}
          />
        </>
      );
    } else if (type === "Memory") {
      return (
        <>
          <TextInput
            placeholder="Type the words you want to be in the memory exercise"
            label="Memory Words"
            name="memoryWords"
            hint="Press enter after each word"
            onChange={(e) => setWords(e.target.value)}
            value={words}
          />
        </>
      );
    } else if (type === "Simple Selection") {
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
    <CustomModal actions={actions} submitter={handleSubmit} data={{ data: { type, order, content, lesson } }}>
      {/* <TextInput label="Type" name="type" hint="Type of the exercise" {...register("help")} /> */}
      <SingleSelect placeholder="Select the type of the exercise" value={type} onChange={setType}>
        <SingleSelectOption value="Completion">Completion</SingleSelectOption>
        <SingleSelectOption value="Memory">Memory</SingleSelectOption>
        <SingleSelectOption value="Simple Selection">Simple Selection</SingleSelectOption>
      </SingleSelect>

      <SingleSelect placeholder="Select the order" value={order} onChange={setOrder}>
        <SingleSelectOption value="1">1</SingleSelectOption>
        <SingleSelectOption value="2">2</SingleSelectOption>
        <SingleSelectOption value="3">3</SingleSelectOption>
      </SingleSelect>

      {renderExerciseFields()}
    </CustomModal>
  );
}
