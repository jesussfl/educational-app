import React, { memo } from "react";
import { useParams, useHistory } from "react-router-dom";

//Design System
import { BaseHeaderLayout, ContentLayout, Button, Link, Breadcrumbs, Crumb } from "@strapi/design-system";
import { Plus, ArrowLeft } from "@strapi/icons";

import pluginId from "../../pluginId";

//Hooks
import { useExerciseManagement } from "./hooks/useExerciseManagement";
import { useAlert } from "../../utils/hooks/useAlert";
import { useFetchData } from "../../utils/hooks/useFetchData";

//Custom Components
import { ExercisesTable } from "../../components/Tables/ByPages/ExercisesTable";
import LessonModal from "../../components/Modal/LessonModal";
import CustomAlert from "../../components/CustomAlert";
import { ExercisesModal } from "../../components/Modal/CustomModal";

function ExercisesPage() {
  const { lessonId } = useParams();
  const history = useHistory();
  const {
    data: { exercises },
    status,
    refreshData,
  } = useFetchData("exercises", lessonId);
  console.log(exercises);
  const { showModal, setShowModal, exerciseActions, response } = useExerciseManagement(refreshData);
  const { showAlert } = useAlert(response);
  return (
    <>
      {showAlert && <CustomAlert response={response} />}
      <BaseHeaderLayout
        navigationAction={
          <Link startIcon={<ArrowLeft />} to={`/plugins/${pluginId}/lessons`}>
            Go back
          </Link>
        }
        primaryAction={<Button startIcon={<Plus />}>Add an exercise</Button>}
        title="Exercises Panel"
        subtitle={
          !status.isLoading && (
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
        <ExercisesTable data={exercises} paginationData={exercises?.meta.pagination} status={status} actions={{ exerciseActions, setShowModal }} />
      </ContentLayout>
      {showModal && <ExercisesModal actions={{ exerciseActions, setShowModal }} />}
    </>
  );
}

export default memo(ExercisesPage);
