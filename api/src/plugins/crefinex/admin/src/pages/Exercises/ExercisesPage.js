import React from "react";
import { useParams, useHistory } from "react-router-dom";

import { BaseHeaderLayout, ContentLayout, Button, Link, Breadcrumbs, Crumb } from "@strapi/design-system";
import { ExercisesTable, CustomAlert, CustomLoader } from "../../components";
import { Plus, ArrowLeft } from "@strapi/icons";

//Hooks
import { useQuery } from "@tanstack/react-query";
import LessonActionsAPI from "../../api/lesson/services/lessonServices";
import actionsAPI from "../../api/exercise/services/exercises";
import { useModal } from "../../utils/contexts/ModalContext";
function ExercisesPage() {
  const { lessonId } = useParams();
  const history = useHistory();
  const { data: lesson, isLoading, error } = useQuery(["lessons", lessonId], () => LessonActionsAPI.findById(lessonId));
  const { setShowModal } = useModal();

  if (isLoading) return <CustomLoader />;
  if (error) return <CustomAlert data={{ type: "error", message: error.name }} />;

  const lessonInfo = lesson.data.attributes;
  const exercises = lessonInfo.exercises;
  const world = lessonInfo.world.data?.attributes.name;

  return (
    <>
      <BaseHeaderLayout
        navigationAction={
          <Link startIcon={<ArrowLeft />} onClick={() => history.goBack()}>
            Go back
          </Link>
        }
        primaryAction={
          <Button startIcon={<Plus />} onClick={() => setShowModal(true)}>
            Add an exercise
          </Button>
        }
        title="Exercises Panel"
        subtitle={
          <Breadcrumbs label="folders">
            <Crumb>{`World: ${world}`}</Crumb>
            <Crumb>{`Module: ${lessonInfo.module.data.description} (ID: ${lessonInfo.module.data.id})`}</Crumb>
            <Crumb>{`lesson: ${lessonInfo.description} (ID: ${lessonId})`}</Crumb>
            <Crumb>Exercises</Crumb>
          </Breadcrumbs>
        }
        as="h2"
      />

      <ContentLayout>
        <ExercisesTable data={exercises} actions={actionsAPI} lessonId={lessonId} lessonInfo={lessonInfo} />
      </ContentLayout>
    </>
  );
}

export default ExercisesPage;
