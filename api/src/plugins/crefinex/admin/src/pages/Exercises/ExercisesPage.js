import React from "react";
import { useParams, useHistory } from "react-router-dom";

//Design System
import { BaseHeaderLayout, ContentLayout, Button, Link, Breadcrumbs, Crumb } from "@strapi/design-system";
import { Plus, ArrowLeft } from "@strapi/icons";
import { ExercisesTable, ExercisesModal, CustomAlert } from "../../components";

//Hooks
import { useExerciseManagement } from "./hooks/useExerciseManagement";
import { useFetchData, useAlert } from "../../utils/";

//Custom Components

function ExercisesPage() {
  const { lessonId } = useParams();
  const history = useHistory();
  const {
    data: { exercises },
    status,
    refreshData,
  } = useFetchData("exercises", lessonId);
  const { showModal, setShowModal, entryActions, response } = useExerciseManagement(refreshData);
  const { showAlert } = useAlert(response);
  return (
    <>
      {showAlert && <CustomAlert response={response} />}
      <BaseHeaderLayout
        navigationAction={
          <Link startIcon={<ArrowLeft />} onClick={() => history.goBack()}>
            Go back
          </Link>
        }
        primaryAction={<Button startIcon={<Plus />}>Add an exercise</Button>}
        title="Exercises Panel"
        subtitle={
          !status.isLoading &&
          !status.isDataEmpty.value && (
            <Breadcrumbs label="folders">
              <Crumb>{`World: ${exercises?.data[0].attributes.lesson.data.attributes.world.data.attributes.name}`}</Crumb>
              <Crumb>{`Module: ${exercises?.data[0].attributes.lesson.data.attributes.module.data.attributes.description} (ID: ${exercises?.data[0].attributes.lesson.data.id})`}</Crumb>
              <Crumb>{`Exercises `}</Crumb>
            </Breadcrumbs>
          )
        }
        as="h2"
      />

      <ContentLayout>
        <ExercisesTable data={exercises} paginationData={exercises?.meta.pagination} status={status} actions={{ entryActions, setShowModal }} />
      </ContentLayout>
      {showModal && <ExercisesModal actions={{ entryActions, setShowModal }} id={lessonId} />}
    </>
  );
}

export default ExercisesPage;
