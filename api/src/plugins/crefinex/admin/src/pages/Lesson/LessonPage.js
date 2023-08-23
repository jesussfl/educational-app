import React from "react";
import { useParams, useHistory } from "react-router-dom";

import { BaseHeaderLayout, ContentLayout, Button, Link, Breadcrumbs, Crumb } from "@strapi/design-system";
import { Plus, ArrowLeft } from "@strapi/icons";
import { LessonTable, LessonModal, CustomAlert } from "../../components";

//Hooks
import { useAlert, useFetchData } from "../../utils/";
import { useLessonManagement } from "./hooks/useLessonManagement";

function LessonPage() {
  const { moduleId } = useParams();
  const history = useHistory();
  const {
    data: { lessons },
    status,
    refreshData,
  } = useFetchData("lessons", moduleId);
  const { showModal, setShowModal, lessonActions, response } = useLessonManagement(refreshData);
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
        primaryAction={<Button startIcon={<Plus />}>Add a lesson</Button>}
        title="Lessons Panel"
        subtitle={
          !status.isLoading &&
          !status.error.value && (
            <Breadcrumbs label="folders">
              <Crumb>{`World: ${lessons.moduleData.attributes.world.data.attributes.name}`}</Crumb>
              <Crumb>{`Module: ${lessons.moduleData.attributes.description} (ID: ${lessons.moduleData.id})`}</Crumb>
            </Breadcrumbs>
          )
        }
        as="h2"
      />

      <ContentLayout>
        <LessonTable data={lessons?.lessonData} paginationData={lessons?.lessonData.meta.pagination} status={status} actions={{ lessonActions, setShowModal }} />
      </ContentLayout>
      {showModal && <LessonModal setShowModal={setShowModal} createLesson={lessonActions.createLesson} moduleID={moduleId} moduleData={lessons?.moduleData} />}
    </>
  );
}

export default LessonPage;
