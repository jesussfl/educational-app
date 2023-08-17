import React, { memo, useState, useEffect } from "react";
import {
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,
  Button,
  Link,
  Loader,
  Flex,
  Breadcrumbs,
  Crumb,
} from "@strapi/design-system";
import { useParams } from "react-router-dom";

import { Plus, ArrowLeft } from "@strapi/icons";
import { Illo } from "../../components/Illo";

import ModuleModal from "../../components/Modal/ModuleModal";
import LessonTable from "../../components/Tables/LessonTable";
import moduleRequests from "../../api/module/services/modules";
import lessonRequests from "../../api/lesson/services/lessons";
import worldRequests from "../../api/world/services/worlds";
import pluginId from "../../pluginId";

// import PropTypes from 'prop-types';

function LessonPage() {
  const { moduleId } = useParams();

  const [worldData, setWorld] = useState([]);
  const [lessonData, setLesson] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const worldData = await worldRequests.getAllWorlds();
      const lessonData = await lessonRequests.getLessonsByModuleId(moduleId);

      console.log(lessonData.data);
      setWorld(worldData.data);
      setLesson(lessonData.data);

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
        navigationAction={
          <Link startIcon={<ArrowLeft />} to={`/plugins/${pluginId}`}>
            Go back
          </Link>
        }
        title="Lessons Panel"
        subtitle={
          <Breadcrumbs label="folders">
            <Crumb>Lessons</Crumb>
            <Crumb>Lesson ID: {moduleId} and Description: </Crumb>
          </Breadcrumbs>
        }
        as="h2"
      />

      <ContentLayout>
        {!lessonData || lessonData.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any lessons yet..."
            action={
              <Button
                onClick={() => setShowModal(true)}
                variant="secondary"
                startIcon={<Plus />}
              >
                Add your first Lesson
              </Button>
            }
          />
        ) : (
          <>
            <LessonTable
              lessonData={lessonData}
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

export default memo(LessonPage);
