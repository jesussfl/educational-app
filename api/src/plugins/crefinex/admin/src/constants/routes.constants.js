import pluginId from "../pluginId";

export const APP_ROUTES = {
  HOME: `/plugins/${pluginId}`,
  LESSONS: `/plugins/${pluginId}/lessons/:sectionId`,
  EXERCISES: `/plugins/${pluginId}/exercises/:lessonId`,
  SECTIONS: `/plugins/${pluginId}/sections`,
};
export const ROUTES = {
  SECTIONS: `/plugins/${pluginId}/sections?page=1&pageSize=10&sort=id:ASC`,
  LESSON: (id) => `/plugins/${pluginId}/lessons/${id}?page=1&pageSize=10&sort=id:ASC`,
  EXERCISE: (id) => `/plugins/${pluginId}/exercises/${id}?page=1&pageSize=10&sort=id:ASC`,
};
