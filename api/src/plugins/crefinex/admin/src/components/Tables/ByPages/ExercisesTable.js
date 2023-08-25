import React, { useState } from "react";
import pluginId from "../../../pluginId";
import { Box, Flex, Typography, Tbody, Tr, Td, IconButton, Link } from "@strapi/design-system";
import { ArrowRight, Trash } from "@strapi/icons";
import { useModal } from "../../../utils/contexts/ModalContext";
import { CustomTable, DeleteDialog, ExercisesModal, TableHeaders } from "../../../components";

export default function ExercisesTable({ data, actions, lessonId, lessonInfo }) {
  const isDataEmpty = data.isEmpty || data.data.length === 0;
  const { showModal, setShowModal, idToEdit, setIdToEdit, dataToEdit, setDataToEdit, idToDelete, setIdToDelete } = useModal();

  const tableConfig = {
    tableName: "exercises",
    emptyStateMessage: "There are no exercises yet",
    createModal: () => <ExercisesModal mainAction={actions.create} data={lessonInfo} lessonId={lessonId} />,
    editModal: () => (
      <ExercisesModal
        data={lessonInfo}
        lessonId={lessonId}
        mainAction={actions.update}
        defaultValues={dataToEdit}
        editId={idToEdit}
        setIdToEdit={setIdToEdit}
      />
    ),
    deleteDialog: () => (
      <DeleteDialog showDialog={setIdToDelete} mainAction={actions.delete} idToDelete={idToDelete} section={"exercises"} />
    ),
  };

  return (
    <CustomTable
      config={tableConfig}
      isDataEmpty={isDataEmpty}
      paginationData={{ page: 1, pageSize: 10, pageCount: 1 }}
      renderDeleteDialog={() => idToDelete !== null && tableConfig.deleteDialog()}
      renderEditModal={() => showModal && idToEdit !== null && tableConfig.editModal()}
      renderCreateModal={() => showModal && idToEdit === null && tableConfig.createModal()}
    >
      <TableHeaders data={data.data} />
      <Tbody>
        {data.data.map((row) => {
          const attributes = row.attributes;
          return (
            <Tr key={row.id}>
              <Td>
                <Typography textColor="neutral800">{row.id}</Typography>
              </Td>

              <Td>
                <Typography textColor="neutral800">{attributes.type}</Typography>
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
                <Typography textColor="neutral800">{attributes.order}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.content || ""}</Typography>
              </Td>
              <Td></Td>
              <Td>
                <Flex style={{ justifyContent: "end" }}>
                  <Link to={`/plugins/${pluginId}/exercises/${row.id}?page=1&pageSize=10&sort=id:ASC`}>
                    <IconButton label="Go to Lessons" noBorder icon={<ArrowRight />} />
                  </Link>
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
