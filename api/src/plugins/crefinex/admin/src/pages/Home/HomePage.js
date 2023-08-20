import React from "react";

import { BaseHeaderLayout, ContentLayout, Alert } from "@strapi/design-system";

import { useFetchData } from "../../utils/hooks/useFetchData";
import { useModuleManagement } from "./hooks/useModuleManagement";
import { useAlert } from "../../utils/hooks/useAlert";
import { ModuleTable } from "../../components/Tables/ByPages/ModuleTable";
import { ModuleModal } from "../../components/Modal/CustomModal";
import CustomAlert from "../../components/CustomAlert";

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
  console.log("MODULLEEEEE", modules);
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
