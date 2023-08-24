import React, { useState } from "react";
import pluginId from "../../../pluginId";
import { Box, Flex, Typography, Tbody, Tr, Td, IconButton, Link } from "@strapi/design-system";
import { ArrowRight, Trash, Pencil } from "@strapi/icons";
import { DeleteDialog, CustomTable, ModuleModal, TableHeaders, EmptyState } from "../../../components";
import { SimpleMenu, MenuItem } from "@strapi/design-system/v2";
import { NavLink } from "react-router-dom";
import { useModal } from "../../../utils/ModalContext";

export default function ModuleTable({ data, actions }) {
  const isDataEmpty = data.isEmpty || data.data.length === 0;

  const { showModal, setShowModal } = useModal();

  const [idToDelete, setIdToDelete] = useState(null);
  const [idToEdit, setIdToEdit] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);


  if (isDataEmpty) return <EmptyState showModal={setShowModal}
    renderActionModal={() => <ModuleModal mainAction={actions.actionsAPI.create}
      extraActions={{ alert: actions.alert }} />}
    message="There are no modules yet" />;

  return (
    <CustomTable
      paginationData={data.meta.pagination}

      renderDeleteDialog={() => idToDelete !== null && <DeleteDialog showDialog={setIdToDelete}
        actions={actions}
        idToDelete={idToDelete}
        section={"lessons"} />}

      renderEditModal={() => showModal && idToEdit !== null && <ModuleModal mainAction={actions.actionsAPI.update}
        extraActions={{ alert: actions.alert, setIdToEdit }}
        defaultValues={dataToEdit}
        editId={idToEdit} />}

      renderCreateModal={() => showModal && idToEdit === null && <ModuleModal mainAction={actions.actionsAPI.create}
        extraActions={{ alert: actions.alert }}
      />}
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
                <SimpleMenu label={attributes.lessons.data.length}>
                  {attributes.lessons.data.map((lesson) => (
                    <MenuItem
                      as={NavLink}
                      key={lesson.id}
                      to={`/plugins/${pluginId}/exercises/${lesson.id}?page=1&pageSize=10&sort=id:ASC`}
                    >{`${lesson.attributes.description} - ${lesson.attributes.order}`}</MenuItem>
                  ))}
                </SimpleMenu>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.world.data?.attributes?.name || ""}</Typography>
              </Td>
              <Td>
                <Flex style={{ justifyContent: "end" }}>
                  <Link to={`/plugins/${pluginId}/lesson/${row.id}?page=1&pageSize=10&sort=id:ASC`}>
                    <IconButton label="Go to Lessons" noBorder icon={<ArrowRight />} />
                  </Link>
                  <Box paddingLeft={1}>
                    <IconButton onClick={() => { setDataToEdit({ ...attributes, world: attributes.world.data.id }); setIdToEdit(row.id), setShowModal(true) }} label="Edit" noBorder icon={<Pencil />} />
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

    </CustomTable >
  );
}
