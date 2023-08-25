import React from "react";
import pluginId from "../../../pluginId";
import { Box, Flex, Typography, Tbody, Tr, Td, IconButton, Link } from "@strapi/design-system";
import { ArrowRight, Trash, Pencil } from "@strapi/icons";
import { DeleteDialog, CustomTable, ModuleModal, TableHeaders } from "../../../components";
import { SimpleMenu, MenuItem } from "@strapi/design-system/v2";
import { NavLink } from "react-router-dom";
import { useModal } from "../../../utils/contexts/ModalContext";

export default function ModuleTable({ data, actions }) {
  const isDataEmpty = false;
  const { showModal, setShowModal, idToEdit, setIdToEdit, dataToEdit, setDataToEdit, idToDelete, setIdToDelete } = useModal();

  const tableConfig = {
    tableName: "modules",
    emptyStateMessage: "There are no modules yet",

    createModal: () => <ModuleModal mainAction={actions.create} />,
    editModal: () => <ModuleModal mainAction={actions.update} defaultValues={dataToEdit} editId={idToEdit} setIdToEdit={setIdToEdit} />,
    deleteDialog: () => <DeleteDialog showDialog={setIdToDelete} mainAction={actions.delete} idToDelete={idToDelete} section={"modules"} />,
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
      {/* <TableHeaders data={data} /> */}
      <Tbody>
        {data.map((row) => {
          // const attributes = row.attributes;

          return (
            <Tr key={row.id}>
              <Td>
                <Typography textColor="neutral800">{row.id}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{row.description}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{row.order}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{row.createdAt}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{row.updatedAt}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{row.publishedAt}</Typography>
              </Td>
              {/* <Td>
                <SimpleMenu label={attributes.lessons.data.length}>
                  {attributes.lessons.data.map((lesson) => (
                    <MenuItem
                      as={NavLink}
                      key={lesson.id}
                      to={`/plugins/${pluginId}/exercises/${lesson.id}?page=1&pageSize=10&sort=id:ASC`}
                    >{`${lesson.attributes.description} - ${lesson.attributes.order}`}</MenuItem>
                  ))}
                </SimpleMenu>
              </Td> */}
              <Td>{/* <Typography textColor="neutral800">{attributes.world.data?.attributes?.name || ""}</Typography> */}</Td>
              <Td>
                <Flex style={{ justifyContent: "end" }}>
                  <Link to={`/plugins/${pluginId}/lesson/${row.id}?page=1&pageSize=10&sort=id:ASC`}>
                    <IconButton label="Go to Lessons" noBorder icon={<ArrowRight />} />
                  </Link>
                  <Box paddingLeft={1}>
                    <IconButton
                      onClick={() => {
                        // setDataToEdit({ ...attributes, world: attributes.world.data.id });
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
