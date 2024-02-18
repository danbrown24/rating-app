import { observer } from "mobx-react-lite";
import { Button, Text } from "../components";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../navigators";
import { useStores } from "../models";
import { useCallback, useEffect, useMemo } from "react";
import useShouldConstrainWidth from "../lib/hooks/useShouldConstrainWidth";
import { logger } from "app/lib";
import { DimensionValue } from "react-native";
import { translate } from "app/i18n";

const MAX_WIDTH = 400;

const Login = observer(({ navigation }: NativeStackScreenProps<AppStackParamList, "login">) => {
  const { authenticationStore } = useStores();
  const shouldConstrainWidth = useShouldConstrainWidth(MAX_WIDTH);

  useEffect(() => navigation.setOptions({ title: translate("loginScreen.tabTitle") }));

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

  const login = useCallback(() => {
    const email = "dan@savvy.com";
    authenticationStore
      .loginByEmail(email, "Password1")
      .then((user) => {
        logger.info(`Signed in with email ${user.email}`);
        logger.info(`User is`, user);
        navigation.navigate("home");
      })
      .catch((error) => {
        logger.info(`FAILED to sign in with email ${email} :(`, error);
      });
  }, []);

  // __DEV__ && useEffect(() => login(), []);

  return (
    <Container style={contentStyle}>
      <HeadingContainer>
        <LoginText tx="loginScreen.title" />
      </HeadingContainer>
      <LoginButton onPress={login} tx="loginScreen.login" />
    </Container>
  );
});

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const LoginText = styled(Text)`
  text-align: center;
  font-size: 28px;
  font-weight: 600;
`;
const LoginButton = styled(Button)``;

const HeadingContainer = styled.View`
  min-height: 30%;
  justify-content: center;
`;

export default Login;
