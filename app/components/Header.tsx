import styled, { useTheme } from "styled-components/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { AppStackParamList } from "../navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStores } from "../models";
import { TouchableOpacity } from "react-native";
import { useCallback } from "react";
import { translate } from "app/i18n";

const TitleCont = styled.Pressable`
  flex: 1;
  align-items: center;
`;

const TitleText = styled.Text`
  color: ${(props) => props.theme.colors.headerItems};
  font-weight: 600;
  font-size: 18px;
`;

const IconCont = styled.Pressable`
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 50px;
`;

const Container = styled.SafeAreaView`
  width: 100%;
  background-color: ${(props) => props.theme.colors.headerBackground};
`;

const Wrapper = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Header = observer(
  ({
    navigation,
  }: {
    navigation: NativeStackScreenProps<AppStackParamList, keyof AppStackParamList>["navigation"];
  }) => {
    const rootStore = useStores();
    const theme = useTheme();

    const toggleDarkMode = useCallback(() => rootStore.setDarkMode(!rootStore.darkMode), []);
    return (
      <Container>
        <Wrapper>
          <IconCont onPress={() => navigation.navigate("dashboard")}>
            <Ionicons name="home" size={24} color={theme.colors.headerItems} />
          </IconCont>
          <DarkModeToggleButton onPress={toggleDarkMode}>
            {rootStore.darkMode ? (
              <Feather name="sun" size={20} color={theme.colors.headerItems} />
            ) : (
              <Ionicons name="moon" size={20} color={theme.colors.headerItems} />
            )}
          </DarkModeToggleButton>
          <TitleCont onPress={() => rootStore.authenticationStore.logout()}>
            <TitleText>{translate("header.title")}</TitleText>
          </TitleCont>
          <IconCont onPress={() => navigation.navigate("add")}>
            <Ionicons name="add" size={34} color={theme.colors.headerItems} />
          </IconCont>
        </Wrapper>
      </Container>
    );
  },
);

const DarkModeToggleButton = styled(TouchableOpacity)`
  position: absolute;
  left: 60px;
  z-index: 1;
`;

export default Header;
