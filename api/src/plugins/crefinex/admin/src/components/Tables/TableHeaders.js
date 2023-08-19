import React from "react";
import { Typography, VisuallyHidden, Thead, Tr, Th } from "@strapi/design-system";

export default function TableHeaders({ data }) {
  const headers = Object.keys(data[0]?.attributes) || [];
  return (
    <Thead>
      <Tr>
        <Th>
          <Typography variant="sigma">ID</Typography>
        </Th>
        {headers.map((header, index) => (
          <Th key={index}>
            <Typography variant="sigma">{headers[index]}</Typography>
          </Th>

          // UNCOMMENT THIS IF YOU WANT TO AVOID RELATION ATTRIBUTES
          // const attribute = data[0].attributes[header];

          // // Check if the attribute has a type of "relation"
          // if (attribute.type !== "relation") {
          //   return <Th key={header.id}>{header}</Th>;
          // }

          // return null; // Exclude relation attribute header
        ))}
        <Th>
          <VisuallyHidden>Actions</VisuallyHidden>
        </Th>
      </Tr>
    </Thead>
  );
}
