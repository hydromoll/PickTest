import {action, computed, makeObservable, observable} from 'mobx';
import {StyleProp, TextInput, TextInputProps, ViewStyle} from 'react-native';
import {colors} from '../../../constants/colors';
import {createRef} from 'react';
import {ValidateMethodReturn} from '../../../services/validator';

export interface DefaultInputControllerConstructor
  extends Pick<TextInputProps, 'placeholder' | 'keyboardType' | 'value'> {
  error?: string;
  validator?: (text: string) => ValidateMethodReturn;
}

export class DefaultInputController {
  ref = createRef<TextInput>();
  @observable
  private _value;

  @observable focused = false;
  placeholder;
  @observable error;
  keyboardType;
  validator;
  constructor(props?: DefaultInputControllerConstructor) {
    this._value = props?.value || '';
    this.placeholder = props?.placeholder || '';
    this.error = props?.error || '';
    this.keyboardType = props?.keyboardType || 'default';
    this.validator = props?.validator;
    makeObservable(this);
  }

  @action.bound
  setError(value: string) {
    this.error = value;
  }

  @computed public get value() {
    return this._value;
  }
  public set value(value) {
    this._value = value;
  }

  focus() {
    this.ref?.current?.focus();
  }

  @action.bound
  setFocused(value: boolean) {
    this.focused = value;
  }

  @action.bound
  validate() {
    this.setFocused(false);
    if (this.value.trim() === '') {
      this.setError('Заполните поле');
      return false;
    }
    if (this.validator) {
      const {isCorrectValue, error} = this.validator(this.value.trim());

      if (!isCorrectValue) {
        this.setError(error);
      }
      return isCorrectValue;
    }
    return true;
  }

  onBlur() {
    this.validate();
  }

  @action.bound
  onFocus() {
    this.setError('');
    this.setFocused(true);
  }
  @action.bound
  onChange(text: string) {
    this.value = text;
  }

  @computed get inputColors() {
    if (this.error) {
      return {bg: colors.statusError10, border: colors.statusError};
    }
    if (this.focused || this.value.length > 0) {
      return {bg: colors.white, border: colors.secondary};
    }
    return {bg: colors.secondary, border: colors.secondary};
  }
}

export interface InputComponentProps {
  controller: DefaultInputController;
  style?: StyleProp<ViewStyle>;
}
