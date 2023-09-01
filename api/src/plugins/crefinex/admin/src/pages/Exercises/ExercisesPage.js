import React from "react";
import { useParams, useHistory } from "react-router-dom";

import { BaseHeaderLayout, ContentLayout, Button, Link, Breadcrumbs, Crumb } from "@strapi/design-system";
import { ExercisesTable, CustomAlert, CustomLoader, CustomTable, ExercisesModal, DeleteDialog } from "../../components";
import { Plus, ArrowLeft } from "@strapi/icons";
import { ExerciseRows } from "../../components/Tables/ByPages/ExerciseRows";
//Hooks
import { useQuery } from "@tanstack/react-query";

import { useModal } from "../../utils/contexts/ModalContext";
import { QUERY_KEYS } from "../../constants/queryKeys.constants";
import { usePagination } from "../../utils/hooks/usePagination";
import { query } from "../../graphql/client/GraphQLCLient";
import { queryExercisesByLessonId } from "../../graphql/queries/exercise.queries";
import {
  createExerciseMutation as createMutation,
  updateExerciseMutation as updateMutation,
  deleteExerciseMutation as deleteMutation,
} from "../../graphql/mutations/exercise.mutations";
function ExercisesPage() {
  const history = useHistory();
  const { lessonId } = useParams();
  const { currentPage, rowsPerPage } = usePagination();
  const {
    data: exercisesData,
    isLoading,
    error,
  } = useQuery([QUERY_KEYS, lessonId], () =>
    query(queryExercisesByLessonId, {
      id: lessonId,
      start: currentPage,
      limit: rowsPerPage,
    })
  );
  const { setShowModal } = useModal();

  if (isLoading) return <CustomLoader />;
  if (error) return <CustomAlert data={{ type: "error", message: error.name }} />;
  const exercises = exercisesData.exercisesByLesson;
  const lessonInfo = exercises.lesson;
  const world = exercises.lesson?.world?.data?.attributes.name;
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
            <Crumb>{`Module: ${exercises.lesson?.section?.data?.attributes?.description} (ID: ${lessonInfo?.section?.data?.id})`}</Crumb>
            <Crumb>{`lesson: ${lessonInfo?.description} (ID: ${lessonId})`}</Crumb>
            <Crumb>Exercises</Crumb>
          </Breadcrumbs>
        }
        as="h2"
      />

      <ContentLayout>
        <CustomTable
          config={{
            tableName: "exercises",
            emptyStateMessage: "There are no exercises yet",
            createModal: () => <ExercisesModal mainAction={createMutation} data={lessonInfo} lessonId={lessonId} />,
            editModal: () => <ExercisesModal mainAction={updateMutation} data={lessonInfo} lessonId={lessonId} />,
            deleteDialog: () => <DeleteDialog mainAction={deleteMutation} section={"exercises"} />,
          }}
          data={exercises.exercises}
          paginationData={exercises.pagination}
          lessonId={lessonId}
          lessonInfo={lessonInfo}
        >
          <ExerciseRows data={exercises.exercises} />
        </CustomTable>
      </ContentLayout>
    </>
  );
}

export default ExercisesPage;
