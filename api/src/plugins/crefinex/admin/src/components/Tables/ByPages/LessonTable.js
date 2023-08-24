import React, { useState } from "react";
import pluginId from "../../../pluginId";
import { Box, Flex, Typography, Tbody, Tr, Td, IconButton, Link, Tab } from "@strapi/design-system";
import { ArrowRight, Trash, Pencil } from "@strapi/icons";

import { CustomTable, DeleteDialog, LessonModal, EmptyState, TableHeaders } from "../../../components";
import { useModal } from "../../../utils/ModalContext";
export default function LessonTable({ data, actions, moduleId, moduleInfo }) {
  const isDataEmpty = data.isEmpty || data.data.length === 0;

  const { showModal, setShowModal } = useModal();
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToEdit, setIdToEdit] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);

  if (isDataEmpty) return <EmptyState showModal={setShowModal}
    renderActionModal={() => <LessonModal data={moduleInfo} moduleId={moduleId} mainAction={actions.actionsAPI.create}
      extraActions={{ alert: actions.alert }} />}
    message="There are no lessons yet" />;

  return (
    <CustomTable paginationData={{ page: 1, pageSize: 10, pageCount: 1 }}
      renderDeleteDialog={() => idToDelete !== null && <DeleteDialog showDialog={setIdToDelete}
        actions={actions}
        idToDelete={idToDelete}
        section={"lessons"} />}

      renderEditModal={() => showModal && idToEdit !== null && <LessonModal data={moduleInfo} moduleId={moduleId} mainAction={actions.actionsAPI.update}
        extraActions={{ alert: actions.alert, setIdToEdit }}
        defaultValues={dataToEdit}
        editId={idToEdit} />}

      renderCreateModal={() => showModal && idToEdit === null && <LessonModal data={moduleInfo} moduleId={moduleId} mainAction={actions.actionsAPI.create}
        extraActions={{ alert: actions.alert }} />} >
      <TableHeaders data={data.data} />
      <Tbody>
        {data.data.map((row) => {
          const attributes = row.attributes;
          console.log("attributesssss", attributes);
          return (
            <Tr key={row.id}>
              <Td>
                <Typography textColor="neutral800">{row.id}</Typography>
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
                <Typography textColor="neutral800">{attributes.description}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.order}</Typography>
              </Td>
              <Td>{/* <Typography textColor="neutral800">{attributes.module.data.id || ""}</Typography> */}</Td>
              <Td>
                <Flex style={{ justifyContent: "end" }}>
                  <Link to={`/plugins/${pluginId}/exercises/${row.id}?page=1&pageSize=10&sort=id:ASC`}>
                    <IconButton label="Go to Lessons" noBorder icon={<ArrowRight />} />
                  </Link>
                  <Box paddingLeft={1}>
                    <IconButton onClick={() => { setDataToEdit({ ...attributes }); setIdToEdit(row.id), setShowModal(true) }} label="Edit" noBorder icon={<Pencil />} />
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
