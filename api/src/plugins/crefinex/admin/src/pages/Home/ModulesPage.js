import React, { useState } from "react";

import { BaseHeaderLayout, ContentLayout, Button } from "@strapi/design-system";
import { ModuleTable, ModuleModal, CustomAlert, CustomLoader } from "../../components";
import { useHistory, useLocation } from "react-router-dom";

import { Plus } from "@strapi/icons";
import { useAlert, usePagination } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import actionsAPI from "../../api/module/services/moduleServices";
function HomePage() {
  const { currentPage, rowsPerPage } = usePagination();
  const {
    data: modules,
    isLoading,
    error,
  } = useQuery(["modules", currentPage, rowsPerPage], () => actionsAPI.getAll({ page: currentPage, pageSize: rowsPerPage }));
  const [showModal, setShowModal] = useState(false);
  const alert = useAlert();

  if (isLoading) return <CustomLoader />;
  if (error) return <CustomAlert data={{ type: "error", message: error.name }} />;

  return (
    <>
      {alert.isAlertVisible && <CustomAlert data={alert.data} />}
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
        <ModuleTable data={modules} error={error} actions={{ actionsAPI, setShowModal, alert }} />
        {showModal && <ModuleModal mainAction={actionsAPI.create} extraActions={{ setShowModal, alert }} />}
      </ContentLayout>
    </>
  );
}

export default HomePage;
