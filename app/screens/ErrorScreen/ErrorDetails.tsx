import React, { ErrorInfo } from "react";
import { ScrollView, TextStyle, View, ViewStyle } from "react-native";
import { Button, Screen, Text } from "../../components";
import { spacing } from "../../theme";

export interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  onReset(): void;
}

export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$contentContainer}>
      <View style={$topSection}>
        <Text style={$heading} preset="subheading" tx="errorScreen.title" />
        <Text tx="errorScreen.friendlySubtitle" />
      </View>

      <ScrollView style={$errorSection} contentContainerStyle={$errorSectionContentContainer}>
        <Text style={$errorContent} weight="bold" text={`${props.error}`.trim()} />
        <Text style={$errorBacktrace} text={`${props.errorInfo?.componentStack ?? ""}`.trim()} />
      </ScrollView>

      <Button style={$resetButton} onPress={props.onReset} tx="errorScreen.reset" />
    </Screen>
  );
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.large,
  paddingTop: spacing.extraLarge,
  flex: 1,
};

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: "center",
};

const $heading: TextStyle = {
  color: "red",
  marginBottom: spacing.medium,
};

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: "gray",
  marginVertical: spacing.medium,
  borderRadius: 6,
};

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.medium,
};

const $errorContent: TextStyle = {
  color: "red",
};

const $errorBacktrace: TextStyle = {
  marginTop: spacing.medium,
  color: "gray",
  userSelect: "text",
};

const $resetButton: ViewStyle = {
  backgroundColor: "red",
  paddingHorizontal: spacing.extraLarge,
};
