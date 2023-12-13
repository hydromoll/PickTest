import {StyleSheet} from 'react-native';

export const textStyles = StyleSheet.create({
  title4Semibold: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 42,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    //добавлено чтобы больше соответствовать макету
    fontWeight: '600',
  },
});
