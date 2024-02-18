import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { Text, TextProps } from "./Text";

export interface ButtonProps extends TouchableOpacityProps {
  disabled?: boolean;
  text?: string;
  onPress?: () => void;
  tx?: TextProps["tx"];
}

export const Button = (props: ButtonProps) => {
  const { text, tx, disabled, onPress, style } = props;

  return (
    <Container disabled={!!disabled} accessibilityRole="button" onPress={() => onPress?.()} style={style}>
      <Label text={text} tx={tx} />
    </Container>
  );
};

const Container = styled.TouchableOpacity<{ disabled: boolean }>`
  height: 40px;
  margin: 16px 16px 0 16px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.buttonBackground};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  border-radius: 4px;
`;

const Label = styled(Text)`
  color: ${(props) => props.theme.colors.buttonText};
  font-weight: bold;
`;

export default Button;
