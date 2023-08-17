import React, { memo, useState, useEffect } from "react";
import { nanoid } from "nanoid";

// @ts-ignore
import {
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,
  Button,
  Loader,
  Flex,
} from "@strapi/design-system";

// @ts-ignore
import Plus from "@strapi/icons/Plus";
import { Illo } from "../../components/Illo";

import ModuleModal from "../../components/Modal/ModuleModal";
import ModuleCount from "../../components/ModuleCounter";
import ModuleTable from "../../components/Tables/ModuleTable";
import moduleRequests from "../../api/module/services/modules";
import worldRequests from "../../api/world/services/worlds";
// import PropTypes from 'prop-types';

function HomePage() {
  const [moduleData, setModule] = useState([]);
  const [worldData, setWorld] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // @ts-ignore
  useEffect(() => {
    async function fetchData() {
      const fetchData = await moduleRequests.getAllModules();
      const worldData = await worldRequests.getAllWorlds();

      setModule(fetchData.data);
      setWorld(worldData.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  async function addModule(data) {
    await moduleRequests.createModule(data);
  }
  async function toogleModule(data) {
    alert("Add Toggle Todo in API");
  }

  async function deleteModule(data) {
    alert("Add Delete Todo in API");
  }

  async function editModule(id, data) {
    alert("Add Edit Todo in API");
  }

  if (isLoading)
    return (
      <Flex
        style={{
          Flex: 1,
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Loader>Loading...</Loader>
      </Flex>
    );
  return (
    <>
      <BaseHeaderLayout
        title="Crefinex Panel"
        subtitle="Add content for the app here"
        as="h2"
      />

      <ContentLayout>
        {!moduleData || moduleData.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any Modules yet..."
            action={
              <Button
                onClick={() => setShowModal(true)}
                variant="secondary"
                startIcon={<Plus />}
              >
                Add your first Module
              </Button>
            }
          />
        ) : (
          <>
            <ModuleCount count={moduleData.length} />

            <ModuleTable
              moduleData={moduleData}
              setShowModal={setShowModal}
              toogleModule={toogleModule}
              editModule={editModule}
              deleteModule={deleteModule}
            />
          </>
        )}
      </ContentLayout>
      {showModal && (
        <ModuleModal
          setShowModal={setShowModal}
          addModule={addModule}
          worldData={worldData}
        />
      )}
    </>
  );
}

export default memo(HomePage);
