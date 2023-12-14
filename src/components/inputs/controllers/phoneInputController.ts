import {DefaultInputController} from '.';
import {DefaultInputControllerConstructor} from './defaultInputController';
import {phoneLengthWithMask} from '../../../constants/length';
import {Mask} from '../../../services';

export class PhoneInputController extends DefaultInputController {
  constructor(props: DefaultInputControllerConstructor) {
    super({...props, value: '+7', placeholder: 'Номер телефона'});
  }
  onChange(text: string): void {
    if (text.length < 2) {
      this.value = '+';
    } else {
      this.value = Mask.formatPhone(text);
    }
  }
  validate() {
    if (this.value.length < phoneLengthWithMask) {
      this.error = 'Заполните поле до конца';
      return false;
    }
    return super.validate();
  }
}
