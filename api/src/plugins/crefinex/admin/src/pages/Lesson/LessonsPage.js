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
import { getLessonsBySection } from "../../queries/lessonsBySection";
import { useGraphQL } from "../../utils/contexts/GraphqlContext";

function LessonsPage() {
  const history = useHistory();
  const { sectionId } = useParams();
  const { setShowModal } = useModal();
  const { graphQLClient } = useGraphQL();
  const { currentPage, rowsPerPage } = usePagination();
  const { data, isLoading, error } = useQuery(["lessons", sectionId, currentPage, rowsPerPage], () =>
    graphQLClient.request(getLessonsBySection(sectionId, currentPage, rowsPerPage))
  );
  const { lessonsBySection } = isLoading ? {} : data;
  const lessons = lessonsBySection?.lessons;
  const world = lessonsBySection?.section?.world?.data?.attributes?.name;

  if (error) return <CustomAlert data={{ type: "error", message: error.name }} />;

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
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
                <Crumb>{`Section: ${lessonsBySection.section?.description} (ID: ${sectionId})`}</Crumb>
              </Breadcrumbs>
            }
            as="h2"
          />
          <ContentLayout>
            <LessonTable
              data={lessons}
              paginationData={lessonsBySection.pagination}
              actions={actionsAPI}
              sectionId={sectionId}
              sectionInfo={lessonsBySection.section?.description}
            />
          </ContentLayout>
        </>
      )}
    </>
  );
}

export default LessonsPage;
