import React, { useState } from "react";
import { Box, Flex, Typography, Tbody, Tr, Td, IconButton, Link } from "@strapi/design-system";
import { ArrowRight, Trash, Pencil } from "@strapi/icons";
import { DeleteDialog, CustomAlert, CustomTable, ModuleModal } from "../../../components";
import pluginId from "../../../pluginId";
import { SimpleMenu, MenuItem } from "@strapi/design-system/v2";
import { NavLink } from "react-router-dom";
export default function ModuleTable({ data, error, actions }) {
  if (error !== null) return <CustomAlert data={{ type: "error", message: error.name }} />;
  const [showModal, setShowModal] = useState(false);
  const [moduleIdToDelete, setModuleIdToDelete] = useState(null);
  const [moduleToEdit, setModuleToEdit] = useState(null);
  const actionsAPI = actions.actionsAPI;
  const alert = actions.alert;

  return (
    <CustomTable actions={actions} data={data} paginationData={data.meta.pagination}>
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
                    <IconButton onClick={() => setModuleToEdit({...attributes, world:attributes.world.data.id})} label="Delete" noBorder icon={<Pencil />} />
                  </Box>
                  <Box paddingLeft={1}>
                    <IconButton onClick={() => setModuleIdToDelete(row.id)} label="Delete" noBorder icon={<Trash />} />
     
                  </Box>
                </Flex>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
      {moduleIdToDelete != null && (
        <DeleteDialog showDialog={setModuleIdToDelete} actions={actions} idToDelete={moduleIdToDelete} section={"lessons"} />
      )}
                 {moduleToEdit != null && (
        <ModuleModal actions={{ actionsAPI, setShowModal, alert }} actionType="update" data={moduleToEdit} />
      )}

    </CustomTable>
  );
}
