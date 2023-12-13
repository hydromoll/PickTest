import React from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Input} from '../../components';
import {AuthController} from './authController';
import {Button} from '../../components/button/button';
import {textStyles} from '../../constants/textStyles';
import {colors} from '../../constants/colors';
const controller = new AuthController();
export const Auth = observer(() => {
  return (
    <KeyboardAvoidingView
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
        return true;
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="always"
        keyboardShouldPersistTaps="always"
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainerStyle}>
        <Text style={styles.header}>Добрый вечер</Text>
        <Text style={styles.subHeading}>
          Для бронирования помещений{'\n'}заполните форму
        </Text>
        <Input controller={controller.name} />
        <Input controller={controller.surname} />
        <Input controller={controller.phone} />
        <Input controller={controller.email} />
        <Input controller={controller.flatCount} />
        <Button
          onPress={() => controller.submit()}
          title={`Забронировать ${controller.buttonLabel}`}
          loading={controller.loading}
        />
        <Text style={styles.disclaimer}>
          Это дисклеймер, который есть во всех формах
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContentContainerStyle: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 50, //для устройств с маленьким экраном
  },
  header: {
    ...textStyles.title4Semibold,
    marginTop: 56,
  },
  subHeading: {
    ...textStyles.body,
    textAlign: 'center',
    marginTop: 16,
  },
  disclaimer: {
    ...textStyles.caption,
    marginTop: 16,
    color: colors.secondaryMedium,
  },
});
