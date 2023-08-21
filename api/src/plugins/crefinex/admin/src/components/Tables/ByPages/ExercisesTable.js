import React, { useState } from "react";
import pluginId from "../../../pluginId";
import { Box, Flex, Typography, Tbody, Tr, Td, IconButton, Link } from "@strapi/design-system";
import { ArrowRight, Trash } from "@strapi/icons";

import { CustomTable, DeleteDialog } from "../../../components";

export default function ExercisesTable({ data, paginationData, status, actions }) {
  let rowData = status.isLoading ? [] : data.data;
  const [exerciseIdToDelete, setExerciseIdToDelete] = useState(null);

  return (
    <CustomTable actions={actions} data={data} paginationData={paginationData} status={status}>
      <Tbody>
        {rowData.map((row) => {
          const attributes = row.attributes;
          console.log(attributes);
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
              <Td>
                <Typography textColor="neutral800">{attributes.lesson.data.id || ""}</Typography>
              </Td>
              <Td>
                <Flex style={{ justifyContent: "end" }}>
                  <Link to={`/plugins/${pluginId}/exercises/${row.id}?page=1&pageSize=10&sort=id:ASC`}>
                    <IconButton label="Go to Lessons" noBorder icon={<ArrowRight />} />
                  </Link>
                  <Box paddingLeft={1}>
                    <IconButton onClick={() => setExerciseIdToDelete(row.id)} label="Delete" noBorder icon={<Trash />} />
                  </Box>
                </Flex>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
      {exerciseIdToDelete != null && (
        <DeleteDialog showDialog={setExerciseIdToDelete} deleteAction={actions.exerciseActions.deleteExercise} showModal={actions.showModal} idToDelete={exerciseIdToDelete} />
      )}
    </CustomTable>
  );
}
