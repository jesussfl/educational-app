import React from "react";
import { Illo } from "../../components/Illo";
import { EmptyStateLayout, Button } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
export default function EmptyState({ message, showModal }) {
  return (
    <EmptyStateLayout
      icon={<Illo />}
      content={message}
      action={
        <Button onClick={() => showModal(true)} variant="secondary" startIcon={<Plus />}>
          Add an entry
        </Button>
      }
    />
  );
}
