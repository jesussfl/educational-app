import React from "react";
import { Box, Flex, Typography, Tbody, Tr, Td, IconButton, Link } from "@strapi/design-system";
import { SimpleMenu, MenuItem } from "@strapi/design-system/v2";
import { ArrowRight, Trash, Pencil } from "@strapi/icons";
import { NavLink } from "react-router-dom";
import { useModal } from "../../../utils/";
import { ROUTES } from "../../../constants/routes.constants";

export function LessonRows({ data }) {
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
              <Typography textColor="neutral800">{attributes.exercises.data.length}</Typography>
            </Td>
            <Td>
              <Flex style={{ justifyContent: "end" }}>
                <Link to={ROUTES.EXERCISE(row.id)}>
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
  );
}
