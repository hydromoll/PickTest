import {phoneLengthWithMask} from '../constants/length';

export class Mask {
  static formatPhone(phone: string): string {
    if (!phone) {
      return '';
    }
    if (phone.length >= phoneLengthWithMask) {
      return phone.slice(0, phoneLengthWithMask);
    }
    const digitsOnly = phone.replace(/\D/g, '');
    const match = digitsOnly.match(
      /^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/,
    );

    if (!match) {
      phone = phone.slice(0, phoneLengthWithMask);
      return this.formatPhone(phone);
    }
    const [
      ,
      countryCode,
      firstGroup,
      secondGroup,
      thirdGroup,
      fourthGroup,
      fiveGroup,
    ] = match;
    let formattedNumber = '';
    if (countryCode) {
      formattedNumber += `+${countryCode} `;
    }
    if (firstGroup) {
      formattedNumber += `(${firstGroup}`;
    }
    if (secondGroup) {
      formattedNumber += `)-${secondGroup}`;
    }
    if (thirdGroup) {
      formattedNumber += `-${thirdGroup}`;
    }
    if (fourthGroup) {
      formattedNumber += `-${fourthGroup}`;
    }
    if (fiveGroup) {
      formattedNumber += `-${fiveGroup}`;
    }

    return formattedNumber.trim();
  }
}
