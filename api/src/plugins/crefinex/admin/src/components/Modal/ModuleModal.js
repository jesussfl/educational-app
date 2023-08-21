import React, { useState } from "react";

import { TextInput, Combobox, ComboboxOption, SingleSelect, SingleSelectOption } from "@strapi/design-system";
import CustomModal from "./CustomModal";

export default function ModuleModal({ actions, data }) {
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
