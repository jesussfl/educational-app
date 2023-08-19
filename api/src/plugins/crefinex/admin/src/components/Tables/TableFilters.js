import React from "react";
import { Flex, SingleSelect, SingleSelectOption, Button, IconButton } from "@strapi/design-system";
import { Cog, Filter } from "@strapi/icons";

export default function TableFilters() {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex gap={4}>
        <IconButton icon={<Cog />} />
        <Button variant="tertiary" startIcon={<Filter />} onClick={() => console.log("Filters")}>
          {" "}
          Filters
        </Button>
      </Flex>
      <Flex gap={4}>
        <SingleSelect placeholder="Select">
          <SingleSelectOption value="apple">Apple</SingleSelectOption>
          <SingleSelectOption value="avocado">Avocado</SingleSelectOption>
          <SingleSelectOption value="banana">Banana</SingleSelectOption>
          <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
          <SingleSelectOption value="mango">Mango</SingleSelectOption>
          <SingleSelectOption value="orange">Orange</SingleSelectOption>
          <SingleSelectOption value="strawberry">Strawberry</SingleSelectOption>
        </SingleSelect>

        <IconButton icon={<Cog />} />
      </Flex>
    </Flex>
  );
}
