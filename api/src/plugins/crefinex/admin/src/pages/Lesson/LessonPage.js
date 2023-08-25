import React from "react";
import actionsAPI from "../../api/lesson/services/lessonServices";
import moduleActionsAPI from "../../api/module/services/moduleServices";

import { BaseHeaderLayout, ContentLayout, Button, Link, Breadcrumbs, Crumb } from "@strapi/design-system";
import { Plus, ArrowLeft } from "@strapi/icons";
import { LessonTable, CustomAlert, CustomLoader } from "../../components";

//Hooks

import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useModal } from "../../utils/contexts/ModalContext";
import { usePagination } from "../../utils/hooks/usePagination";

function LessonPage() {
  const history = useHistory();
  const { moduleId } = useParams();
  const { setShowModal } = useModal();
  const { currentPage, rowsPerPage } = usePagination();
  const {
    data: module,
    isLoading,
    error,
  } = useQuery(["modules", moduleId, currentPage, rowsPerPage], () =>
    moduleActionsAPI.findById(moduleId, { page: currentPage, pageSize: rowsPerPage })
  );

  if (isLoading) return <CustomLoader />;
  if (error) return <CustomAlert data={{ type: "error", message: error.name }} />;

  const moduleInfo = module.data.attributes;
  const lessons = moduleInfo.lessons;
  const world = moduleInfo.world.data.attributes.name;

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
            Add a lesson
          </Button>
        }
        title="Lessons Panel"
        subtitle={
          <Breadcrumbs label="folders">
            <Crumb>{`World: ${world}`}</Crumb>
            <Crumb>{`Module: ${moduleInfo.description} (ID: ${moduleId})`}</Crumb>
          </Breadcrumbs>
        }
        as="h2"
      />

      <ContentLayout>
        <LessonTable data={lessons} moduleId={moduleId} actions={actionsAPI} moduleInfo={moduleInfo} />
      </ContentLayout>
    </>
  );
}

export default LessonPage;
