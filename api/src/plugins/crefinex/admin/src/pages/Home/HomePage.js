import React from "react";

import { BaseHeaderLayout, ContentLayout, EmptyStateLayout, Button } from "@strapi/design-system";

import Plus from "@strapi/icons/Plus";
import { Illo } from "../../components/Illo";

import ModuleModal from "../../components/Modal/ModuleModal";
import ModuleCount from "../../components/ModuleCounter";
import ModuleTable from "../../components/Tables/ModuleTable";
import { useFetchData } from "../../utils/hooks/useFetchData";
import { useModuleManagement } from "./hooks/useModuleManagement";
import { useAlert } from "../../utils/hooks/useAlert";
import CustomLoader from "../../components/CustomLoader";

function HomePage() {
  const { data, isLoading, refreshData } = useFetchData(["worlds", "modules"]);
  const { showModal, setShowModal, moduleActions, response } = useModuleManagement(refreshData);
  const { showAlert } = useAlert(response);

  const modules = data.modules || [];
  const worlds = data.worlds || [];

  const isModuleDataEmpty = modules.length === 0 && !isLoading;

  const renderPageContent = () => {
    if (isLoading) {
      return <CustomLoader />;
    }

    return (
      <>
        <ModuleCount count={modules.length} />
        <ModuleTable moduleData={modules} setShowModal={setShowModal} />
      </>
    );
  };
  const renderAlert = () => {
    if (showAlert) {
      return (
        <Alert style={{ position: "absolute", top: "45px", left: "50%", transform: "translateX(-15%)", width: "450px" }} closeLabel="Close" title={response.title} variant={response.type}>
          {response.message}
        </Alert>
      );
    }
  };
  return (
    <>
      {renderAlert()}
      <BaseHeaderLayout title="Crefinex Panel" subtitle="Add content for the app here" as="h2" />

      <ContentLayout>
        {isModuleDataEmpty ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any Modules yet..."
            action={
              <Button onClick={() => setShowModal(true)} variant="secondary" startIcon={<Plus />}>
                Add your first Module
              </Button>
            }
          />
        ) : (
          renderPageContent()
        )}

        {showModal && <ModuleModal setShowModal={setShowModal} addModule={moduleActions.createModule} worldData={worlds} />}
      </ContentLayout>
    </>
  );
}

export default HomePage;
