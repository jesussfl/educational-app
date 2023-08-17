import React from "react";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { Typography } from "@strapi/design-system/Typography";

export default function ModuleCount({ count }) {
  return (
    <Box background="neutral0" hasRadius shadow="filterShadow">
      <Flex justifyContent="center" padding={8}>
        <Typography variant="alpha">
          You have a total of {count} modules 🚀
        </Typography>
      </Flex>
    </Box>
  );
}
