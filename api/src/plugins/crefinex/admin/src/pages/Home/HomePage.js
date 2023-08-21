import React from "react";

import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system";
import { ModuleTable, ModuleModal, CustomAlert } from "../../components/";

import { useFetchData, useAlert } from "../../utils/";
import { useModuleManagement } from "./hooks/useModuleManagement";

function HomePage() {
  const {
    data: { modules },
    status: modulesStatus,
    refreshData: refreshModulesData,
  } = useFetchData("modules");
  const {
    data: { worlds },
  } = useFetchData("worlds");

  const { showModal, setShowModal, entryActions, response } = useModuleManagement(refreshModulesData);
  const { showAlert } = useAlert(response);
  return (
    <>
      {showAlert && <CustomAlert response={response} />}
      <BaseHeaderLayout title="Crefinex Panel" subtitle="Add content for the app here" as="h2" />
      <ContentLayout>
        <ModuleTable data={modules} paginationData={modules?.meta.pagination} status={modulesStatus} actions={{ entryActions, setShowModal }} />
        {showModal && <ModuleModal actions={{ entryActions, setShowModal }} data={worlds} />}
      </ContentLayout>
    </>
  );
}

export default HomePage;
