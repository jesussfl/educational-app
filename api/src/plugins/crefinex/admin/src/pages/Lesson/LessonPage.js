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
import lessonRequests from "../../api/lesson/services/lessons";
import moduleRequests from "../../api/module/services/modules";
import pluginId from "../../pluginId";

// import PropTypes from 'prop-types';

function LessonPage() {
  const { moduleId } = useParams();
  const [lessonData, setLesson] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLessonData();
  }, [showModal]);

  const fetchLessonData = async () => {
    setIsLoading(true);
    const lessonData = await lessonRequests.getLessonsByModuleId(moduleId);
    setLesson(lessonData.data);
    console.log(lessonData);
    setIsLoading(false);
  };
  const handleDelete = async (lessonId) => {
    await lessonRequests.deleteLesson(lessonId);
    await fetchLessonData();
  };

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
              {!isLoading &&
                `Module: ID: ${moduleId} - ${lessonData[0].attributes.module.data.attributes.description}`}
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
              handleDelete={handleDelete}
            />
          </>
        )}
      </ContentLayout>
      {showModal && (
        <LessonModal
          setShowModal={setShowModal}
          createLesson={lessonRequests.createLesson}
          moduleID={moduleId}
          lessonData={lessonData}
        />
      )}
    </>
  );
}

export default memo(LessonPage);
