/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
// @ts-ignore
import { AnErrorOccurred } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import HomePage from "../HomePage";
import LessonPage from "../Lesson/LessonPage";

function App() {
  return (
    <div>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route
          path={`/plugins/${pluginId}/lesson/:moduleId`}
          component={LessonPage}
          exact
        />

        <Route component={AnErrorOccurred} />
      </Switch>
    </div>
  );
}

export default App;
