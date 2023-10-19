export function findFirstUnlockedLessonIndex(lessons, lessonsCompleted) {
  let firstUnlockedLessonIndex = -1;

  for (let index = 0; index < lessons.length; index++) {
    const isLessonComplete = checkIfLessonCompleted(
      lessons[index],
      lessonsCompleted
    );

    if (isLessonComplete) {
      firstUnlockedLessonIndex = index;
    }

    if (
      index === firstUnlockedLessonIndex &&
      checkIfLessonLocked(index, firstUnlockedLessonIndex, isLessonComplete)
    ) {
      firstUnlockedLessonIndex = -1;
    }
  }

  return firstUnlockedLessonIndex;
}

export function checkIfLessonCompleted(lesson, lessonsCompleted) {
  return lessonsCompleted.some(
    (completedLesson) => completedLesson.attributes.lesson.data.id === lesson.id
  );
}
export function checkIfLessonUnlocked(
  index,
  firstUnlockedLessonIndex,
  isFirstSection
) {
  return index === firstUnlockedLessonIndex + 1 && isFirstSection;
}

export function checkIfLessonLocked(
  index,
  firstUnlockedLessonIndex,
  isLessonCompleted
) {
  return !isLessonCompleted && index !== firstUnlockedLessonIndex;
}
