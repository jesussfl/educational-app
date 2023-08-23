import React, { useState } from "react";

import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system";
import { ModuleTable, ModuleModal, CustomAlert, CustomLoader } from "../../components";

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
  const [showModal, setShowModal] = useState(false);
  const alert = useAlert();

  return (
    <>
      {alert.isAlertVisible && <CustomAlert data={alert.data} />}
      <BaseHeaderLayout title="Crefinex Panel" subtitle="Add content for the app here" as="h2" />
      <ContentLayout>
        {modules.isLoading ? (
          <CustomLoader />
        ) : (
          <ModuleTable data={modules.data} error={modules.error} actions={{ actionsAPI, setShowModal, alert }} />
        )}
        {showModal && <ModuleModal actions={{ actionsAPI, setShowModal, alert }} data={worlds.data.data} />}
      </ContentLayout>
    </>
  );
}

export default HomePage;
