import {Alert, Keyboard} from 'react-native';
import {action, computed, makeObservable, observable} from 'mobx';
import {
  DefaultInputController,
  PhoneInputController,
} from '../../components/inputs/controllers';
import {url} from '../../constants/api';
import {Validator, WordForms} from '../../services';

export class AuthController {
  @observable loading = false;

  name = new DefaultInputController({
    placeholder: 'Ваше имя',
    validator: text => Validator.onlyCharacters(text),
  });

  surname = new DefaultInputController({
    placeholder: 'Фамилия',
    validator: text => Validator.onlyCharacters(text),
  });

  phone = new PhoneInputController({
    placeholder: 'Телефон',
    keyboardType: 'number-pad',
    validator: text => Validator.phone(text),
  });

  email = new DefaultInputController({
    placeholder: 'Email',
    validator: (text: string) => Validator.email(text),
  });

  flatCount = new DefaultInputController({
    placeholder: 'Количество помещений',
    keyboardType: 'number-pad',
    validator: (text: string) => Validator.moreThanZero(text),
  });

  constructor() {
    makeObservable(this);
  }
  @action.bound
  setLoading(value: boolean) {
    this.loading = value;
  }

  private validateForm() {
    const forms = [
      this.name,
      this.surname,
      this.phone,
      this.email,
      this.flatCount,
    ];
    return forms.some(form => !form.validate());
  }

  async submit() {
    Keyboard.dismiss();
    const hasFormErrors = this.validateForm();
    if (!hasFormErrors) {
      try {
        this.setLoading(true);
        await new Promise(res =>
          setTimeout(() => {
            res(true);
          }, 5000),
        );
        const response = await fetch(`${url}/front-tests`, {
          method: 'POST',
          body: JSON.stringify({
            user: {
              firstName: this.name.value.trim(),
              lastName: this.surname.value.trim(),
              mail: this.email.value.trim(),
              phone: this.phone.value.trim(),
            },
            order: {
              flatsCount: this.flatCount.value.trim(),
              time: new Date().getTime() / 1000,
            },
          }),
        });
        if (response.ok) {
          const json = await response.json();
          Alert.alert(`Ваша заявка с id: ${json.id}, отправлена`);
        }
      } catch (error) {
        Alert.alert('Ошибка. попробуйте позже');
      } finally {
        this.setLoading(false);
      }
    }
  }

  @computed get buttonLabel() {
    const count = +this.flatCount.value;
    if (count > 0) {
      return `${count} ${WordForms.pluralForm(count, 'flat')}`;
    }
    return '';
  }
}
