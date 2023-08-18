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
  Typography,
} from "@strapi/design-system";
import { useParams } from "react-router-dom";

import { Plus, ArrowLeft, Pencil } from "@strapi/icons";
import { Illo } from "../../components/Illo";

import LessonModal from "../../components/Modal/LessonModal";
import LessonTable from "../../components/Tables/LessonTable";

import pluginId from "../../pluginId";
import { useFetchLessonsData } from "./hooks/useFetchLessonsData";
import { useLessonManagement } from "./hooks/useLessonManagement";
// import PropTypes from 'prop-types';

function LessonPage() {
  const { moduleId } = useParams();
  const { lessonData, moduleData, isLoading, fetchData } =
    useFetchLessonsData(moduleId);
  const { showModal, setShowModal, deleteLesson, createLesson } =
    useLessonManagement(fetchData);

  console.log("ESTOY RENDERIZANDO LA PAGINA PRINCIPAL", isLoading, lessonData);

  return (
    <>
      <BaseHeaderLayout
        navigationAction={
          <Link startIcon={<ArrowLeft />} to={`/plugins/${pluginId}`}>
            Go back
          </Link>
        }
        primaryAction={<Button startIcon={<Plus />}>Add a lesson</Button>}
        title="Lessons Panel"
        subtitle={
          <Breadcrumbs label="folders">
            <Crumb>Lessons</Crumb>
            {/* <Crumb>
              {isLoading
                ? `Loading...`
                : `Module: ID: ${moduleId} - ${moduleData.attributes.description}`}
            </Crumb> */}
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
            {isLoading && (
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
            )}
            <LessonTable
              lessonData={lessonData}
              setShowModal={setShowModal}
              handleDelete={deleteLesson}
            />
          </>
        )}
      </ContentLayout>
      {showModal && (
        <LessonModal
          setShowModal={setShowModal}
          createLesson={createLesson}
          moduleID={moduleId}
          lessonData={lessonData}
          moduleData={moduleData}
        />
      )}
    </>
  );
}

export default LessonPage;
