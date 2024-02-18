import { forwardRef, Ref, useImperativeHandle, useRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import styled, { useTheme } from "styled-components/native";

export interface TextFieldProps extends Omit<TextInputProps, "ref"> {
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: string;
  /**
   * The helper text to display if not using `helperTx`.
   */
  error?: string;
  /**
   * The placeholder text to display
   */
  placeholder?: string;
}

/**
 * A component that allows for the entering and editing of text.
 */
export const TextField = forwardRef(function TextField(props: TextFieldProps, ref: Ref<TextInput>) {
  const theme = useTheme();
  const { label, placeholder, error, style, ...TextInputProps } = props;
  const inputRef = useRef<TextInput>(null);
  const disabled = TextInputProps.editable === false;

  function focusInput() {
    if (disabled) return;

    inputRef.current?.focus();
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useImperativeHandle(ref, () => inputRef.current!);

  return (
    <Container onPress={focusInput} accessibilityState={{ disabled }} style={style}>
      {!!label && <Label>{label}</Label>}
      <InputWrapper error={false}>
        <Input
          ref={inputRef}
          underlineColorAndroid={theme.colors.transparent}
          textAlignVertical="top"
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textInputPlaceholder}
          readOnly={disabled}
          clearButtonMode="always"
          {...TextInputProps}
        />
      </InputWrapper>

      {!!error && <Error>{error}</Error>}
    </Container>
  );
});

const Container = styled.Pressable`
  margin: 16px 16px 0 16px;
`;
const Input = styled.TextInput`
  flex: 1;
  align-self: stretch;
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
  min-height: ${(props) => (props.multiline ? 100 : 40)}px;
  padding: 0;
  margin-top: ${(props) => (props.multiline ? 10 : 0)}px;
`;

const InputWrapper = styled.View<{ error: boolean }>`
  border: ${(props) => (props.error ? "1px solid red" : "none")};
  flex-direction: row;
  align-items: flex-start;
  border-radius: 4px;
  padding: 0 10px;
  background-color: ${(props) => props.theme.colors.textInputBackground};
  overflow: hidden;
`;

const Error = styled.Text`
  color: red;
`;

const Label = styled.Text`
  margin: 6px 0;
  font-weight: 600;
`;
