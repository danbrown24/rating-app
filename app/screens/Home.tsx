import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { DimensionValue, Platform } from "react-native";
import styled from "styled-components/native";
import { Header } from "../components";
import useShouldConstrainWidth from "../lib/hooks/useShouldConstrainWidth";
import { AppStackParamList } from "../navigators";
import { HomeTabNavigator } from "../navigators/HomeTabNavigator";

const MAX_WIDTH = 400;

const Home = observer(({ navigation }: NativeStackScreenProps<AppStackParamList, "home">) => {
  const shouldConstrainWidth = useShouldConstrainWidth(MAX_WIDTH);

  const contentStyle = useMemo(() => {
    if (!shouldConstrainWidth) {
      return null;
    }
    return {
      width: MAX_WIDTH,
      border: "1px solid grey",
      borderTopWidth: 0,
      borderBottomWidth: 0,
      margin: "auto" as DimensionValue,
    };
  }, [shouldConstrainWidth]);

  return (
    <Container statusBarPadding={Platform.OS === "android"}>
      <Content style={contentStyle}>
        <Header navigation={navigation} />
        <HomeTabNavigator />
      </Content>
    </Container>
  );
});

const Container = styled.SafeAreaView<{ statusBarPadding: boolean }>`
  flex: 1;
  padding-top: ${(props) => (props.statusBarPadding ? 28 : 0)}px;
  background-color: ${(props) => props.theme.colors.statusBarBackground};
`;

const Content = styled.View`
  flex: 1;
`;

export default Home;
