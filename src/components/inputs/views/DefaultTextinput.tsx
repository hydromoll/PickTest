import React, {FC, useMemo, useRef} from 'react';
import {
  Animated,
  Easing,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';

import {observer} from 'mobx-react-lite';
import styled from 'styled-components/native';
import {colors} from '../../../constants/colors';
import {InputComponentProps} from '../controllers/defaultInputController';

interface SWrapper {
  inputColors: InputColors;
}

interface InputColors {
  bg: string;
  border: string;
}

const INPUT_HEIGHT = 56;
const INPUT_FONT_SIZE = 14;
export const Input: FC<InputComponentProps> = observer(
  ({controller, style}) => {
    const animatedValue = useRef(new Animated.Value(0));

    const animatedTitleStyle = useMemo(() => {
      if (controller.value) {
        return {
          transform: [
            {
              translateY: 0,
            },
          ],
          fontSize: 12,
          color: controller.error ? colors.statusError : colors.secondaryMedium,
        };
      }
      return {
        transform: [
          {
            translateY: animatedValue?.current?.interpolate({
              inputRange: [0, 1],
              outputRange: [INPUT_FONT_SIZE / 2, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
        fontSize: animatedValue?.current?.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 12],
          extrapolate: 'clamp',
        }),
        color: animatedValue?.current?.interpolate({
          inputRange: [0, 1],
          outputRange: controller.error
            ? [colors.statusError, colors.statusError]
            : [colors.darkGray, colors.secondaryMedium],
        }),
      };
    }, [controller.value, controller.error]);

    const onFocus = () => {
      controller.onFocus();
      Animated.timing(animatedValue?.current, {
        toValue: 1,
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    };

    const onBlur = () => {
      controller.onBlur();
      if (!controller.value) {
        Animated.timing(animatedValue?.current, {
          toValue: 0,
          duration: 500,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          useNativeDriver: false,
        }).start();
      }
    };

    return (
      <>
        <TouchableWithoutFeedback onPress={() => controller.focus()}>
          <Wrapper inputColors={controller.inputColors} style={style}>
            <Animated.Text style={animatedTitleStyle}>
              {controller.placeholder}
            </Animated.Text>
            <TextInput
              keyboardType={controller.keyboardType}
              ref={controller.ref}
              value={controller.value}
              onBlur={onBlur}
              onChangeText={text => controller.onChange(text)}
              onFocus={onFocus}
            />
          </Wrapper>
        </TouchableWithoutFeedback>
        {!!controller.error && <ErrorText>{controller.error}</ErrorText>}
      </>
    );
  },
);

const Wrapper = styled.View<SWrapper>`
  width: 100%;
  border-width: 1px;
  height: ${INPUT_HEIGHT}px;
  padding-left: 16px;
  justify-content: center;
  border-radius: 8px;
  border-color: ${({inputColors}) => inputColors.border};
  background-color: ${({inputColors}) => inputColors.bg};
  margin-top: 24px;
`;

const ErrorText = styled.Text`
  color: ${colors.statusError};
  align-self: flex-start;
`;
