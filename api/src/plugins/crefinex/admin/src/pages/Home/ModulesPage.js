import React, { useState } from "react";

import { BaseHeaderLayout, ContentLayout, Button } from "@strapi/design-system";
import { ModuleTable, ModuleModal, CustomAlert, CustomLoader } from "../../components";

import { Plus } from "@strapi/icons";
import { useAlert, usePagination } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import actionsAPI from "../../api/module/services/moduleServices";
import { useModal } from "../../utils/contexts/ModalContext";
function HomePage() {
  const { currentPage, rowsPerPage } = usePagination();
  const { setShowModal } = useModal();
  const {
    data: modules,
    isLoading,
    error,
  } = useQuery(["modules", currentPage, rowsPerPage], () => actionsAPI.getAll({ page: currentPage, pageSize: rowsPerPage }));

  if (isLoading) return <CustomLoader />;
  if (error) return <CustomAlert data={{ type: "error", message: error.name }} />;

  return (
    <>
      <BaseHeaderLayout
        title="Modules"
        subtitle="Add modules for the app here"
        as="h2"
        primaryAction={
          <Button startIcon={<Plus />} onClick={() => setShowModal(true)}>
            Add a module
          </Button>
        }
      />
      <ContentLayout>
        <ModuleTable data={modules} actions={actionsAPI} />
      </ContentLayout>
    </>
  );
}

export default HomePage;
