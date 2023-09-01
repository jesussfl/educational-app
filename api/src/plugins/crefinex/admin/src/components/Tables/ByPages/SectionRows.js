import React from "react";
import { Box, Flex, Typography, Tbody, Tr, Td, IconButton, Link } from "@strapi/design-system";
import { SimpleMenu, MenuItem } from "@strapi/design-system/v2";
import { ArrowRight, Trash, Pencil } from "@strapi/icons";
import { NavLink } from "react-router-dom";
import { useModal } from "../../../utils/contexts/ModalContext";
import { ROUTES } from "../../../constants/routes.constants";

export function SectionRows({ data }) {
  const { setShowModal, setIdToEdit, setDataToEdit, setIdToDelete } = useModal();
  return (
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
              <SimpleMenu label={attributes.lessons.data.length}>
                {attributes.lessons.data.map((lesson) => (
                  <MenuItem
                    as={NavLink}
                    key={lesson.id}
                    to={ROUTES.EXERCISE(lesson.id)}
                  >{`${lesson.attributes.description} - ${lesson.attributes.order}`}</MenuItem>
                ))}
              </SimpleMenu>
            </Td>
            <Td>
              <Typography textColor="neutral800">{attributes.world.data?.attributes?.name || ""}</Typography>
            </Td>
            <Td>
              <Flex style={{ justifyContent: "end" }}>
                <Link to={ROUTES.LESSON(row.id)}>
                  <IconButton label="Go to Lessons" noBorder icon={<ArrowRight />} />
                </Link>
                <Box paddingLeft={1}>
                  <IconButton
                    onClick={() => {
                      setDataToEdit({ ...attributes, world: attributes.world.data.id });
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
  );
}
