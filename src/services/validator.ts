import {phoneLengthWithMask} from '../constants/length';

export interface ValidateMethodReturn {
  isCorrectValue: boolean;
  error: string;
}

export class Validator {
  private static emailRegexp =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  private static phoneRegexp =
    /^[+]\d{1,3}\s?([(]\d{1,}[)])?\s?[-\s./0-9]*\d{2,}$/;

  private static englishRussianCharacters = /^[a-zA-Zа-яА-Я]+$/;

  static onlyCharacters(text: string): ValidateMethodReturn {
    const isCorrectValue = this.englishRussianCharacters.test(text);
    return {
      isCorrectValue,
      error: !isCorrectValue ? 'Можно использовать только буквы' : '',
    };
  }

  static email(text: string): ValidateMethodReturn {
    const isCorrectValue = this.emailRegexp.test(text);
    return {
      isCorrectValue,
      error: !isCorrectValue ? 'Неправильный формат почты' : '',
    };
  }
  static phone(text: string): ValidateMethodReturn {
    if (text.length !== phoneLengthWithMask) {
      return {
        isCorrectValue: false,
        error: 'Неправильный формат номера телефона',
      };
    }
    const isCorrectValue = this.phoneRegexp.test(text);
    return {
      isCorrectValue,
      error: !isCorrectValue ? 'Неправильный формат номера телефона' : '',
    };
  }
  static moreThanZero(text: string) {
    const isCorrectValue = +text > 0;
    return {
      isCorrectValue,
      error: !isCorrectValue ? 'Число должно быть больше 0' : '',
    };
  }
}
