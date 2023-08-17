import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Typography,
  IconButton,
  VisuallyHidden,
  BaseCheckbox,
  TextInput,
  Link,
  Table,
  Thead,
  TFooter,
  Tbody,
  Tr,
  Td,
  Th,
} from "@strapi/design-system";
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

  return (
    <BaseCheckbox
      checked={isChecked}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

function ExerciseInput({ value, onChange }) {
  return (
    <TextInput
      type="text"
      aria-label="exercise-input"
      name="exercise-input"
      error={value.length > 40 ? "Text should be less than 40 characters" : ""}
      onChange={onChange}
      value={value}
    />
  );
}

export default function ModuleTable({
  lessonData,
  toogleModule,
  deleteModule,
  editModule,
  setShowModal,
}) {
  return (
    <Box
      background="neutral0"
      hasRadius
      shadow="filterShadow"
      padding={8}
      style={{ marginTop: "10px" }}
    >
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
              <Typography variant="sigma">Exercise Amount</Typography>
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
          {lessonData.map((lesson) => {
            console.log(lesson);
            const [inputValue, setInputValue] = useState(
              lesson.attributes.description
            );

            const [isEdit, setIsEdit] = useState(false);

            return (
              <Tr key={lesson.id}>
                <Td>
                  <Typography textColor="neutral800">{lesson.id}</Typography>
                </Td>

                <Td>
                  {isEdit ? (
                    <ExerciseInput
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  ) : (
                    <Typography textColor="neutral800">
                      {lesson.attributes.description}
                    </Typography>
                  )}
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {lesson.attributes.world.data.attributes.name}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{0}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {lesson.attributes.order}
                  </Typography>
                </Td>
                <Td>
                  {isEdit ? (
                    <Flex style={{ justifyContent: "end" }}>
                      <Button
                        onClick={() =>
                          editModule(lesson.id, { name: inputValue })
                        }
                      >
                        Save
                      </Button>
                    </Flex>
                  ) : (
                    <Flex style={{ justifyContent: "end" }}>
                      <Link to={`/plugins/${pluginId}/lesson`}>
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
                        <IconButton
                          onClick={() => setIsEdit(true)}
                          label="Edit"
                          noBorder
                          icon={<Pencil />}
                        />
                      </Box>
                      <Box paddingLeft={1}>
                        <IconButton
                          onClick={() => deleteModule(lesson)}
                          label="Delete"
                          noBorder
                          icon={<Trash />}
                        />
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
