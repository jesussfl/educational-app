import React from "react";
import { Box, Flex, Typography, Tbody, Tr, Td, IconButton, Link } from "@strapi/design-system";

import { ArrowRight, Trash, Pencil } from "@strapi/icons";

import { useModal } from "../../../utils/contexts/ModalContext";
export function ExerciseRows({ data }) {
  const { setIdToDelete } = useModal();
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
              <Typography textColor="neutral800">{attributes.type}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{attributes.order}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{attributes.content || ""}</Typography>
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
            <Td></Td>
            <Td>
              <Flex style={{ justifyContent: "end" }}>
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
