export class FormValidator {
  static min(inputValue: string, min: number) {
    if (inputValue.length < min) {
      return `Can't be less than ${min} characters`;
    }
  }

  static max(inputValue: string, max: number) {
    if (inputValue.length > max) {
      return `Can't be more than ${max} characters`;
    }
  }
}
