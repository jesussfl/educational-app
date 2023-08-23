import React, { useState } from "react";

import { BaseHeaderLayout, ContentLayout, Button } from "@strapi/design-system";
import { ModuleTable, ModuleModal, CustomAlert, CustomLoader } from "../../components";
import { Plus } from "@strapi/icons";
import { useAlert } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import actionsAPI from "../../api/module/services/moduleServices";
function HomePage() {
  const {data:modules, isLoading, error} = useQuery(["modules"], () => actionsAPI.getAll({ page: 1, pageSize: 10 }));
  const [showModal, setShowModal] = useState(false);
  const alert = useAlert();
console.log(modules);
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
        {showModal && <ModuleModal actions={{ actionsAPI, setShowModal, alert }} actionType="create" data={null} />}
      </ContentLayout>
    </>
  );
}

export default HomePage;
