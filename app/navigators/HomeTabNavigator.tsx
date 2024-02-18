import { observer } from "mobx-react-lite";
import React from "react";
import Add from "../screens/Add";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import { StyleSheet } from "react-native";
import { AppStackParamList } from "./AppNavigator";

const Tab = createBottomTabNavigator<AppStackParamList>();

export const HomeTabNavigator = observer(() => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar, //, { marginBottom: Math.max(insets.bottom - 14, 0) }]),
      }}
    >
      <Tab.Screen name="dashboard" component={Dashboard} />
      <Tab.Screen name="add" component={Add} options={{ unmountOnBlur: true }} />
    </Tab.Navigator>
  );
});

const styles = StyleSheet.create({
  tabBar: {
    display: "none",
  },
});
