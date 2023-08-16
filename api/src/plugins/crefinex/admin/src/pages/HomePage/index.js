import React, { memo, useState, useEffect } from "react";
import { nanoid } from "nanoid";

// @ts-ignore
import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";

// @ts-ignore
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";

// @ts-ignore
import { Button } from "@strapi/design-system/Button";

// @ts-ignore
import Plus from "@strapi/icons/Plus";
import { Illo } from "../../components/Illo";

import ModuleModal from "../../components/Modal/ModuleModal";
import ExerciseCount from "../../components/ExerciseCount";
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
      console.log(worldData);
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

  if (isLoading) return <>Loading...</>;
  return (
    <>
      <BaseHeaderLayout
        title="Exercise Plugin"
        subtitle="All your exercises in one place."
        as="h2"
      />

      <ContentLayout>
        {moduleData.length === 0 ? (
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
            <ExerciseCount count={moduleData.length} />

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
