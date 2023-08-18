import React, { memo } from "react";
import { useParams } from "react-router-dom";

//Design System
import { BaseHeaderLayout, ContentLayout, EmptyStateLayout, Button, Link, Breadcrumbs, Crumb, Alert } from "@strapi/design-system";
import { Plus, ArrowLeft } from "@strapi/icons";

import { Illo } from "../../components/Illo";
import pluginId from "../../pluginId";

//Hooks
import { useLessonManagement } from "./hooks/useLessonManagement";
import { useAlert } from "../../utils/hooks/useAlert";
import { useFetchData } from "../../utils/hooks/useFetchData";

//Custom Components
import LessonModal from "../../components/Modal/LessonModal";
import LessonTable from "../../components/Tables/LessonTable";
import CustomLoader from "../../components/CustomLoader";

function LessonPage() {
  const { moduleId } = useParams();
  const { data, isLoading, refreshData } = useFetchData(["lessons"], moduleId);
  const { showModal, setShowModal, lessonActions, response } = useLessonManagement(refreshData);
  const { showAlert } = useAlert(response);

  const lessons = data.lessons?.lessonData || [];
  const module = data.lessons?.moduleData || {};

  const isLessonDataEmpty = lessons.length === 0 && !isLoading;

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
            <Crumb>Modules</Crumb>

            <Crumb>{isLoading ? `Loading...` : `Module: ID: ${moduleId} - ${module.attributes.description}`}</Crumb>
          </Breadcrumbs>
        }
        as="h2"
      />

      <ContentLayout>
        {isLessonDataEmpty ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any lessons yet..."
            action={
              <Button onClick={() => setShowModal(true)} variant="secondary" startIcon={<Plus />}>
                Add your first Lesson
              </Button>
            }
          />
        ) : (
          <LessonTable lessonsData={lessons} moduleData={module} showModal={setShowModal} deleteAction={lessonActions.deleteLesson} isLoading={isLoading} />
        )}
      </ContentLayout>
      {showModal && <LessonModal setShowModal={setShowModal} createLesson={lessonActions.createLesson} moduleID={moduleId} moduleData={data.lessons.moduleData} />}
    </>
  );
}

export default memo(LessonPage);
