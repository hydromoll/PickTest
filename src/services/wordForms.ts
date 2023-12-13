type Forms = [string, string, string];
export type Word = 'flat';
export class WordForms {
  // формат значения одну, две, пять (например)
  private static wordMap: Map<Word, Forms> = new Map([
    ['flat', ['квартиру', 'квартиры', 'квартир']],
  ]);
  static pluralForm(number: number, word: Word): string {
    const forms = this.wordMap.get(word)!;
    // Проверка на "ноль" и "один"
    if (number % 10 === 1 && number % 100 !== 11) {
      return forms[0];
    }

    // Проверка на "два", "три", "четыре" и числа оканчивающиеся на эти цифры
    if (
      number % 10 >= 2 &&
      number % 10 <= 4 &&
      !(number % 100 >= 12 && number % 100 <= 14)
    ) {
      return forms[1];
    }

    // Все остальные случаи
    return forms[2];
  }
}
