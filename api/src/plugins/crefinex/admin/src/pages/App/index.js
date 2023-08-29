import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AnErrorOccurred } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import LessonsPage from "../Lesson/LessonsPage";
import SectionsPage from "../Home/SectionsPage";
import ExercisesPage from "../Exercises/ExercisesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "../../utils/contexts/ModalContext";
import { AlertsProvider } from "../../utils/contexts/AlertsContext";
import { GraphQLProvider } from "../../utils/contexts/GraphqlContext";
// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <GraphQLProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <AlertsProvider>
            <Switch>
              <Route path={`/plugins/${pluginId}`} exact>
                {/* Redirigir desde HomePage a ModulesPage con parámetros de URL */}
                <Redirect to={`/plugins/${pluginId}/sections?page=1&pageSize=10&sort=id:ASC`} />
              </Route>
              <Route path={`/plugins/${pluginId}/lessons/:sectionId`} component={LessonsPage} exact />
              <Route path={`/plugins/${pluginId}/exercises/:lessonId`} component={ExercisesPage} exact />
              <Route path={`/plugins/${pluginId}/sections`} render={() => <SectionsPage />} exact />

              <Route component={AnErrorOccurred} />
            </Switch>
          </AlertsProvider>
        </ModalProvider>
      </QueryClientProvider>
    </GraphQLProvider>
  );
}

export default App;
