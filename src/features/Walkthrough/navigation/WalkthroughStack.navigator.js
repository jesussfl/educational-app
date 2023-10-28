import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Walkthrough1 from "../pages/Walkthrough1";
import Walkthrough2 from "../pages/Walkthrough2";
import Walkthrough3 from "../pages/Walkthrough3";
const WalkthroughStack = createStackNavigator();

const WalkthroughStackNavigator = () => {
  return (
    <WalkthroughStack.Navigator screenOptions={{ headerShown: false }}>
      <WalkthroughStack.Screen name="Walkthrough1" component={Walkthrough1} />
      <WalkthroughStack.Screen name="Walkthrough2" component={Walkthrough2} />
      <WalkthroughStack.Screen name="Walkthrough3" component={Walkthrough3} />
    </WalkthroughStack.Navigator>
  );
};
export default WalkthroughStackNavigator;
