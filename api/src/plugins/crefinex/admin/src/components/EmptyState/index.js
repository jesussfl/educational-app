import React from "react";
import { Illo } from "../../components/Illo";
import { EmptyStateLayout, Button } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { useModal } from "../../utils/contexts/ModalContext";
export default function EmptyState({ message, renderActionModal }) {
  const { showModal, setShowModal } = useModal();
  return (
    <>
      <EmptyStateLayout
        icon={<Illo />}
        content={message}
        action={
          <Button onClick={() => setShowModal(true)} variant="secondary" startIcon={<Plus />}>
            Add an entry
          </Button>
        }
      />
      {showModal && renderActionModal()}
    </>
  );
}
