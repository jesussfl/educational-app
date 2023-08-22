import React from "react";

import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system";
import { ModuleTable, ModuleModal, CustomAlert, CustomLoader } from "../../components/";

import { useFetchData, useAlert } from "../../utils/";
import { useModuleManagement } from "./hooks/useModuleManagement";
import { useQuery, useQueries } from "@tanstack/react-query";
import moduleRequests from "../../api/module/services/modules";
import worldRequests from "../../api/world/services/worlds";
function HomePage() {
  const [modules, worlds] = useQueries({
    queries: [
      { queryKey: ["modules"], queryFn: () => moduleRequests.getAllModules({ page: 1, pageSize: 10 }) },
      { queryKey: ["worlds"], queryFn: () => worldRequests.getAllWorlds() },
    ],
  });
  const { refreshData: refreshModulesData } = useFetchData("modules");

  const { showModal, setShowModal, entryActions, response } = useModuleManagement(refreshModulesData);

  return (
    <>
      <BaseHeaderLayout title="Crefinex Panel" subtitle="Add content for the app here" as="h2" />
      <ContentLayout>
        {modules.isLoading ? <CustomLoader /> : <ModuleTable data={modules.data} error={modules.error} status={modules} actions={{ entryActions, setShowModal }} />}
        {showModal && <ModuleModal actions={{ entryActions, setShowModal }} data={worlds.data} />}
      </ContentLayout>
    </>
  );
}

export default HomePage;
