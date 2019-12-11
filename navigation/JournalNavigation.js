import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import JournalScreen from "../screen/JournalScreen";
import AddJournalScreen from "../screen/AddJournalScreen";
import SingleJournalScreen from "../screen/SingleJournalScreen";

import StartupScreen from "../screen/StartupScreen";
import AuthScreen from "../screen/AuthScreen";

import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor
};

const JournalNavigator = createStackNavigator(
  {
    Journal: JournalScreen,
    AddJournal: AddJournalScreen,
    SingleJournal: SingleJournalScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  StartUp: StartupScreen,
  Auth: AuthNavigator,
  Journal: JournalNavigator
});

export default createAppContainer(MainNavigator);
