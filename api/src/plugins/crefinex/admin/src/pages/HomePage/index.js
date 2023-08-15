import React, { memo, useState } from "react";
import { nanoid } from "nanoid";
import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Illo } from "../../components/Illo";
import { Button } from "@strapi/design-system/Button";
import Plus from "@strapi/icons/Plus";

import ExerciseModal from "../../components/ExerciseModal";
import ExerciseCount from "../../components/ExerciseCount";
import ExerciseTable from "../../components/ExerciseTable";

// import PropTypes from 'prop-types';

const HomePage = () => {
  const [exerciseData, setTodoExercise] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function addExercise(data) {
    setTodoExercise([
      ...exerciseData,
      { ...data, id: nanoid(), isDone: false },
    ]);
  }

  async function toggleExercise(data) {
    alert("Add Toggle Todo in API");
  }

  async function deleteExercise(data) {
    alert("Add Delete Todo in API");
  }

  async function editExercise(id, data) {
    alert("Add Edit Todo in API");
  }

  return (
    <>
      <BaseHeaderLayout
        title="Exercise Plugin"
        subtitle="All your exercises in one place."
        as="h2"
      />

      <ContentLayout>
        {exerciseData.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any exercises yet..."
            action={
              <Button
                onClick={() => setShowModal(true)}
                variant="secondary"
                startIcon={<Plus />}
              >
                Add your first Exercise
              </Button>
            }
          />
        ) : (
          <>
            <ExerciseCount count={exerciseData.length} />

            <ExerciseTable
              exerciseData={exerciseData}
              setShowModal={setShowModal}
              toogleExercise={toggleExercise}
              deleteExercise={deleteExercise}
              editExercise={editExercise}
            />
          </>
        )}
      </ContentLayout>

      {showModal && (
        <ExerciseModal setShowModal={setShowModal} addExercise={addExercise} />
      )}
    </>
  );
};

export default memo(HomePage);
