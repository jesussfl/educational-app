import React from "react";

import { BaseHeaderLayout, ContentLayout, Button, Link, Breadcrumbs, Crumb } from "@strapi/design-system";
import { Plus, ArrowLeft } from "@strapi/icons";
import { CustomAlert, CustomLoader, CustomTable, LessonModal, DeleteDialog } from "../../components";
import { LessonRows } from "../../components/Tables/ByPages/LessonRows";

import { useModal, usePagination } from "../../utils";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys.constants";
import { query } from "../../graphql/client/GraphQLCLient";
import { queryLessonsBySectionId } from "../../graphql/queries/lesson.queries";
import {
  createLessonMutation as createMutation,
  updateLessonMutation as updateMutation,
  deleteLessonMutation as deleteMutation,
} from "../../graphql/mutations/lesson.mutations";
function LessonsPage() {
  //Hooks
  const history = useHistory();
  const { sectionId } = useParams();
  const { setShowModal } = useModal();
  const { currentPage, rowsPerPage } = usePagination();
  const { data, isLoading, error } = useQuery([QUERY_KEYS.lessons, sectionId, currentPage, rowsPerPage], () =>
    query(queryLessonsBySectionId, { id: sectionId, start: currentPage, limit: rowsPerPage })
  );

  //Consts
  const { lessonsBySection } = isLoading ? {} : data;
  const lessons = lessonsBySection?.lessons;
  const sectionInfo = lessonsBySection?.section;
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
            <CustomTable
              config={{
                tableName: "lessons",
                emptyStateMessage: "There are no lessons yet",
                createModal: () => <LessonModal mainAction={createMutation} sectionInfo={sectionInfo} sectionId={sectionId} />,
                editModal: () => <LessonModal sectionInfo={sectionInfo} sectionId={sectionId} mainAction={updateMutation} />,
                deleteDialog: () => <DeleteDialog mainAction={deleteMutation} section={"lessons"} />,
              }}
              data={lessons}
              paginationData={lessonsBySection.pagination}
            >
              <LessonRows data={lessons} />
            </CustomTable>
          </ContentLayout>
        </>
      )}
    </>
  );
}

export default LessonsPage;
