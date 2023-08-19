import React, { memo } from "react";
import { useParams } from "react-router-dom";

//Design System
import { BaseHeaderLayout, ContentLayout, Button, Link, Breadcrumbs, Crumb } from "@strapi/design-system";
import { Plus, ArrowLeft } from "@strapi/icons";

import pluginId from "../../pluginId";

//Hooks
import { useLessonManagement } from "./hooks/useLessonManagement";
import { useAlert } from "../../utils/hooks/useAlert";
import { useFetchData } from "../../utils/hooks/useFetchData";

//Custom Components
import { LessonTable } from "../../components/Tables/ByPages/LessonTable";
import LessonModal from "../../components/Modal/LessonModal";
import CustomAlert from "../../components/CustomAlert";

function LessonPage() {
  const { moduleId } = useParams();
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
          <Link startIcon={<ArrowLeft />} to={`/plugins/${pluginId}`}>
            Go back
          </Link>
        }
        primaryAction={<Button startIcon={<Plus />}>Add a lesson</Button>}
        title="Lessons Panel"
        subtitle={
          !status.isLoading && (
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

export default memo(LessonPage);
