import React from "react";
import { Flex, Loader } from "@strapi/design-system";
export default function CustomLoader() {
  return (
    <Flex
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Loader>Loading...</Loader>
    </Flex>
  );
}
