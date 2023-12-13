import React, {FC} from 'react';
import styled from 'styled-components/native';
import {colors} from '../../constants/colors';
import {
  ActivityIndicator,
  ButtonProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {textStyles} from '../../constants/textStyles';

interface SButtonProps {
  disabled?: boolean;
}

interface Props extends ButtonProps {
  title: string;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button: FC<Props> = ({
  title,
  disabled,
  loading,
  onPress,
  style,
  ...props
}) => {
  const disableButton = loading || disabled;

  const buttonColor = (pressed: boolean) => {
    if (disableButton) {
      return colors.white;
    }
    if (pressed) {
      return colors.primaryExtraDark;
    }
    return colors.primary;
  };

  return (
    <Wrapper
      disabled={disableButton}
      onPress={onPress}
      style={({pressed}) => [{backgroundColor: buttonColor(pressed)}, style]}
      {...props}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Title disabled={disableButton} style={textStyles.button}>
          {title}
        </Title>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.Pressable`
  width: 100%;
  height: 56px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  border-radius: 4px;
  border-width: ${({disabled}) => disabled && 1}px;
  border-color: ${({disabled}) => disabled && colors.secondary};
`;

const Title = styled.Text<SButtonProps>`
  color: ${({disabled}) => (disabled ? colors.gray : colors.white)};
`;
