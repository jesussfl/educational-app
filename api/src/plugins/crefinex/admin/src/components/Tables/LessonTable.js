import React, { useState } from "react";
import { Box, Flex, Typography, IconButton, VisuallyHidden, Link, Table, Thead, TFooter, Tbody, Tr, Td, Th } from "@strapi/design-system";
import pluginId from "../../pluginId";
import CustomLoader from "../CustomLoader";
import { Trash, Plus, ArrowRight } from "@strapi/icons";
import { DeleteDialog } from "../Modal/Dialog/CustomDialogs";

const tableHeaders = ["ID", "Description", "Exercise Amount", "Order"];

export default function LessonTable({ lessonsData, showModal, deleteAction, isLoading }) {
  const [lessonIdToDelete, setLessonIdToDelete] = useState(null);

  console.log(lessonsData);
  return (
    <Box background="neutral0" hasRadius shadow="filterShadow" padding={8} height={isLoading ? "300px" : "auto"} style={{ marginTop: "10px", position: "relative" }}>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <Table
          colCount={6}
          rowCount={10}
          footer={
            <TFooter onClick={() => showModal(true)} icon={<Plus />}>
              Add a lesson
            </TFooter>
          }
        >
          <Thead>
            <Tr>
              {tableHeaders.map((column) => (
                <Th key={column}>{column}</Th>
              ))}
              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>

          <Tbody>{lessonsData.map((lesson) => tableRows(lesson.id, lesson.attributes.description, lesson.attributes.exerciseAmount, lesson.attributes.order))}</Tbody>
        </Table>
      )}

      {lessonIdToDelete != null && <DeleteDialog showDialog={setLessonIdToDelete} deleteAction={deleteAction} idToDelete={lessonIdToDelete} setShowModal={showModal} />}
    </Box>
  );
}

function tableRows(id, description, exerciseAmount, order) {
  return (
    <Tr>
      <Td>
        <Typography textColor="neutral800">{id}</Typography>
      </Td>
      <Td>
        <Typography textColor="neutral800">{description}</Typography>
      </Td>
      <Td>
        <Typography textColor="neutral800">{exerciseAmount}</Typography>
      </Td>
      <Td>
        <Typography textColor="neutral800">{order}</Typography>
      </Td>
      <Td>
        <Flex style={{ justifyContent: "end" }}>
          <Link to={`/plugins/${pluginId}/lesson`}>
            <IconButton label="Go to Lessons" noBorder icon={<ArrowRight />} />
          </Link>
          <Box paddingLeft={1}>
            <IconButton onClick={() => setLessonIdToDelete(lesson.id)} label="Delete" noBorder icon={<Trash />} />
          </Box>
        </Flex>
      </Td>
    </Tr>
  );
}
