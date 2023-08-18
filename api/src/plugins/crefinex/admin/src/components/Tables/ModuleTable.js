import React, { useState } from "react";
import {
  Table,
  Thead,
  TFooter,
  Tbody,
  Tr,
  Td,
  Th,
  // @ts-ignore
} from "@strapi/design-system/Table";

import { Box, Flex, Button, Typography, IconButton, VisuallyHidden, BaseCheckbox, TextInput, Link } from "@strapi/design-system";
import pluginId from "../../pluginId";

import { Pencil, Trash, Plus, ArrowRight } from "@strapi/icons";

function ExerciseCheckbox({ value, checkboxID, callback, disabled }) {
  const [isChecked, setIsChecked] = useState(value);

  function handleChange() {
    setIsChecked(!isChecked);
    {
      callback && callback({ id: checkboxID, value: !isChecked });
    }
  }

  return <BaseCheckbox checked={isChecked} onChange={handleChange} disabled={disabled} />;
}

function ExerciseInput({ value, onChange }) {
  return <TextInput type="text" aria-label="exercise-input" name="exercise-input" error={value.length > 40 ? "Text should be less than 40 characters" : ""} onChange={onChange} value={value} />;
}

export default function ModuleTable({ moduleData, setShowModal }) {
  const [editedModule, setEditedModule] = useState({});

  const handleEditInputChange = (moduleId, value) => {
    setEditedModule((prevEditedLessons) => ({
      ...prevEditedLessons,
      [moduleId]: value,
    }));
  };

  return (
    <Box background="neutral0" hasRadius shadow="filterShadow" padding={8} style={{ marginTop: "10px" }}>
      <Table
        colCount={6}
        rowCount={10}
        footer={
          <TFooter onClick={() => setShowModal(true)} icon={<Plus />}>
            Add a module
          </TFooter>
        }
      >
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">ID</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Description</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">World</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Lessons Amount</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Order</Typography>
            </Th>
            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {moduleData.map((module) => {
            const isEdit = editedModule.hasOwnProperty(module.id);
            const inputValue = isEdit ? editedModule[module.id] : module.attributes.description;

            return (
              <Tr key={module.id}>
                <Td>
                  <Typography textColor="neutral800">{module.id}</Typography>
                </Td>

                <Td>{isEdit ? <ExerciseInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} /> : <Typography textColor="neutral800">{module.attributes.description}</Typography>}</Td>
                <Td>
                  <Typography textColor="neutral800">{module.attributes.world.data.attributes.name}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{0}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{module.attributes.order}</Typography>
                </Td>
                <Td>
                  {isEdit ? (
                    <Flex style={{ justifyContent: "end" }}>
                      <Button onClick={() => editModule(module.id, { name: inputValue })}>Save</Button>
                    </Flex>
                  ) : (
                    <Flex style={{ justifyContent: "end" }}>
                      <Link to={`/plugins/${pluginId}/lesson/${module.id}`}>
                        <IconButton
                          onClick={() => {
                            console.log("lessons");
                          }}
                          label="Go to Lessons"
                          noBorder
                          icon={<ArrowRight />}
                        />
                      </Link>
                      <Box paddingLeft={1}>
                        <IconButton onClick={() => setIsEdit(true)} label="Edit" noBorder icon={<Pencil />} />
                      </Box>
                      <Box paddingLeft={1}>
                        <IconButton onClick={() => deleteModule(module)} label="Delete" noBorder icon={<Trash />} />
                      </Box>
                    </Flex>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
