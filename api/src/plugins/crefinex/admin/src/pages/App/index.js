import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AnErrorOccurred } from "@strapi/helper-plugin";
import { LessonsPage, ExercisesPage, SectionsPage } from "../../pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "../../utils/contexts/ModalContext";
import { AlertsProvider } from "../../utils/contexts/AlertsContext";
import { ROUTES, APP_ROUTES } from "../../constants/routes.constants";
// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AlertsProvider>
          <Switch>
            <Route path={APP_ROUTES.HOME} exact>
              {/* Redirigir desde HomePage a ModulesPage con parámetros de URL */}
              <Redirect to={ROUTES.SECTIONS} />
            </Route>
            <Route path={APP_ROUTES.LESSONS} component={LessonsPage} exact />
            <Route path={APP_ROUTES.EXERCISES} component={ExercisesPage} exact />
            <Route path={APP_ROUTES.SECTIONS} render={() => <SectionsPage />} exact />

            <Route component={AnErrorOccurred} />
          </Switch>
        </AlertsProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
