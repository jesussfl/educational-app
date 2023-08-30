import React from "react";
import pluginId from "../../../pluginId";
import { Box, Flex, Typography, Tbody, Tr, Td, IconButton, Link } from "@strapi/design-system";
import { ArrowRight, Trash, Pencil } from "@strapi/icons";

import { CustomTable, DeleteDialog, LessonModal, TableHeaders } from "../../../components";
import { useModal } from "../../../utils/contexts/ModalContext";
import {
  createLessonMutation as createMutation,
  deleteLessonMutation as deleteMutation,
  updateLessonMutation as updateMutation,
} from "../../../graphql/mutations/lesson.mutations";

const EXERCISES_URL = (id) => `/plugins/${pluginId}/exercises/${id}?page=1&pageSize=10&sort=id:ASC`;

export default function LessonTable({ data, sectionId, sectionInfo, paginationData }) {
  const isDataEmpty = data.length === 0;
  const { showModal, setShowModal, idToEdit, setIdToEdit, dataToEdit, setDataToEdit, idToDelete, setIdToDelete } = useModal();

  const tableConfig = {
    tableName: "lessons",
    emptyStateMessage: "There are no lessons yet",
    createModal: () => <LessonModal mainAction={createMutation} data={sectionInfo} moduleId={sectionId} />,
    editModal: () => (
      <LessonModal
        data={sectionInfo}
        moduleId={sectionId}
        mainAction={updateMutation}
        defaultValues={dataToEdit}
        editId={idToEdit}
        setIdToEdit={setIdToEdit}
      />
    ),
    deleteDialog: () => <DeleteDialog mainAction={deleteMutation} showDialog={setIdToDelete} idToDelete={idToDelete} section={"lessons"} />,
  };

  return (
    <CustomTable
      config={tableConfig}
      isDataEmpty={isDataEmpty}
      paginationData={paginationData}
      renderDeleteDialog={() => idToDelete !== null && tableConfig.deleteDialog()}
      renderEditModal={() => showModal && idToEdit !== null && tableConfig.editModal()}
      renderCreateModal={() => showModal && idToEdit === null && tableConfig.createModal()}
    >
      <TableHeaders data={data} />
      <Tbody>
        {data.map((row) => {
          const attributes = row.attributes;

          return (
            <Tr key={row.id}>
              <Td>
                <Typography textColor="neutral800">{row.id}</Typography>
              </Td>

              <Td>
                <Typography textColor="neutral800">{attributes.description}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.order}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.createdAt}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.updatedAt}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.publishedAt}</Typography>
              </Td>
              <Td>
                <Flex style={{ justifyContent: "end" }}>
                  <Link to={EXERCISES_URL(row.id)}>
                    <IconButton label="Go to Exercises" noBorder icon={<ArrowRight />} />
                  </Link>
                  <Box paddingLeft={1}>
                    <IconButton
                      onClick={() => {
                        setDataToEdit({ ...attributes });
                        setIdToEdit(row.id), setShowModal(true);
                      }}
                      label="Edit"
                      noBorder
                      icon={<Pencil />}
                    />
                  </Box>
                  <Box paddingLeft={1}>
                    <IconButton onClick={() => setIdToDelete(row.id)} label="Delete" noBorder icon={<Trash />} />
                  </Box>
                </Flex>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </CustomTable>
  );
}
