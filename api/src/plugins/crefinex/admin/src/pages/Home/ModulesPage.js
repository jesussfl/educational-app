import React, { useState } from "react";

import { BaseHeaderLayout, ContentLayout, Button } from "@strapi/design-system";
import { ModuleTable, ModuleModal, CustomAlert, CustomLoader } from "../../components";
import { Plus } from "@strapi/icons";
import { useAlert } from "../../utils";
import { useQueries } from "@tanstack/react-query";
import actionsAPI from "../../api/module/services/moduleServices";
import worldActionsAPI from "../../api/world/services/worldServices";
function HomePage() {
  const [modules, worlds] = useQueries({
    queries: [
      { queryKey: ["modules"], queryFn: () => actionsAPI.getAll({ page: 1, pageSize: 10 }) },
      { queryKey: ["worlds"], queryFn: () => worldActionsAPI.getAll() },
    ],
  });
  const isLoading = modules.isLoading || worlds.isLoading;
  const error = modules.error || worlds.error;
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
        <ModuleTable data={modules.data} error={modules.error} actions={{ actionsAPI, setShowModal, alert }} />
        {showModal && <ModuleModal actions={{ actionsAPI, setShowModal, alert }} data={worlds.data.data} />}
      </ContentLayout>
    </>
  );
}

export default HomePage;
