import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { BaseHeaderLayout, ContentLayout, Button, Link, Breadcrumbs, Crumb } from "@strapi/design-system";
import { ExercisesTable, ExercisesModal, CustomAlert, CustomLoader } from "../../components";
import { Plus, ArrowLeft } from "@strapi/icons";

//Hooks
import { useAlert } from "../../utils/";
import { useQuery } from "@tanstack/react-query";
import LessonActionsAPI from "../../api/lesson/services/lessonServices";
import actionsAPI from "../../api/exercise/services/exercises";
function ExercisesPage() {
  const { lessonId } = useParams();
  const history = useHistory();
  const {
    data: lesson,
    isLoading,
    error,
  } = useQuery(["lessons", lessonId], () => LessonActionsAPI.findById(lessonId));
  const [showModal, setShowModal] = useState(false);
  const alert = useAlert();

  if (isLoading) return <CustomLoader />;
  if (error) return <CustomAlert data={{ type: "error", message: error.name }} />;

  const lessonInfo = lesson.data.attributes;
  const exercises = lessonInfo.exercises;
  const world = lessonInfo.world.data?.attributes.name;

  return (
    <>
      {alert.isAlertVisible && <CustomAlert data={alert.data} />}
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
        <ExercisesTable data={exercises} error={error} actions={{ actionsAPI, setShowModal, alert }} />
      </ContentLayout>
      {showModal && <ExercisesModal actions={{ actionsAPI, setShowModal, alert }} lessonId={lessonId} data={lessonInfo} />}
    </>
  );
}

export default ExercisesPage;
