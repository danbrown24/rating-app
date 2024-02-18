/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password) and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React from "react";
import Config from "../config";
import Login from "../screens/Login";
import Home from "../screens/Home";
import { navigationRef, useBackButtonHandler } from "./navigationUtilities";
import { ThemeProvider } from "styled-components/native";
import { getTheme } from "../theme";
import { useStores } from "../models";

export type AppStackParamList = {
  login: undefined;
  home: undefined;
  dashboard: undefined;
  add: undefined;
};

// This is a list of all the route names that will exit the app if the back button is pressed while in that screen. Only affects Android.
const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
});

export interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const rootStore = useStores();

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

  return (
    <NavigationContainer ref={navigationRef} theme={rootStore.darkMode ? DarkTheme : DefaultTheme} {...props}>
      <ThemeProvider theme={getTheme(rootStore.darkMode)}>
        <AppStack />
      </ThemeProvider>
    </NavigationContainer>
  );
});
