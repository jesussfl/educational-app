import React, { useState } from "react";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
  Combobox,
  ComboboxOption,
  CreatableCombobox,
  SingleSelect,
  SingleSelectOption,
  Flex,
} from "@strapi/design-system";
import { Plus, ExclamationMarkCircle, CheckCircle } from "@strapi/icons";

export default function CustomModal({ actions, children, data }) {
  return (
    <ModalLayout
      onClose={() => actions.setShowModal(false)}
      labelledBy="title"
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        actions.entryActions.createEntry(data);
      }}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add entry
        </Typography>
      </ModalHeader>

      <ModalBody style={{ display: "flex", flexDirection: "column", gap: "24px" }}>{children}</ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => actions.setShowModal(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">Add entry</Button>}
      />
    </ModalLayout>
  );
}

export function ExercisesModal({ actions }) {
  const [type, setType] = useState();
  const [order, setOrder] = useState();
  const [completionSentence, setCompletionSentence] = useState();
  const [words, setWords] = useState([]);
  const [options, setOptions] = useState([]);

  const renderExerciseFields = () => {
    if (type === "Completion") {
      return (
        <>
          <TextInput
            placeholder="Add the sentence here"
            label="Completion Sentence"
            name="completionSentence"
            hint="close with curly brackets the words you want to be filled in the exercise"
            onChange={(e) => setCompletionSentence(e.target.value)}
            value={completionSentence}
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
    <CustomModal actions={actions}>
      <SingleSelect placeholder="Select the type of the exercise" value={type} onChange={setType}>
        <SingleSelectOption value="Completion">Completion</SingleSelectOption>
        <SingleSelectOption value="Memory">Memory</SingleSelectOption>
        <SingleSelectOption value="Simple Selection">Simple Selection</SingleSelectOption>
      </SingleSelect>

      <SingleSelect placeholder="Select the order" value={order} onChange={setOrder}>
        {/* Options for the order */}
      </SingleSelect>

      {renderExerciseFields()}
    </CustomModal>
  );
}

export function ModuleModal({ actions, data }) {
  const [description, setDescription] = useState("");
  const [world, setWorld] = useState("");
  const [order, setOrder] = useState();
  return (
    <CustomModal actions={actions} data={{ data: { description, order, world } }}>
      <TextInput
        placeholder="Add a description here"
        label="Description"
        name="description"
        hint="Max 40 characters"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <Combobox placeholder="Select the world of this module" label="World" value={world} onChange={setWorld} onClear={() => setWorld("")}>
        {data.data.map((world) => (
          <ComboboxOption key={world.id} value={world.id}>{`${world.id} - ${world.attributes.name}`}</ComboboxOption>
        ))}
      </Combobox>
      <SingleSelect placeholder="Select" value={order} onChange={setOrder}>
        <SingleSelectOption value="1">1</SingleSelectOption>
        <SingleSelectOption value="2">2</SingleSelectOption>
        <SingleSelectOption value="3">3</SingleSelectOption>
        <SingleSelectOption value="4">4</SingleSelectOption>
        <SingleSelectOption value="5">5</SingleSelectOption>
        <SingleSelectOption value="6">6</SingleSelectOption>
        <SingleSelectOption value="7">7</SingleSelectOption>
        <SingleSelectOption value="8">8</SingleSelectOption>
        <SingleSelectOption value="9">9</SingleSelectOption>
        <SingleSelectOption value="10">10</SingleSelectOption>
        <SingleSelectOption value="11">11</SingleSelectOption>
      </SingleSelect>
    </CustomModal>
  );
}
