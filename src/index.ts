import fs from 'node:fs';
import path from 'node:path';
export class EnglishLexicon {
  public static wordsFile = path.join(path.dirname(__dirname), 'data', 'serialized.json');
  public static words: Set<string> = new Set();

  static {
    const data = fs.readFileSync(this.wordsFile, 'utf-8');
    const wordList = JSON.parse(data) as string[];

    wordList.forEach((word) => {
      this.words.add(word);
    });
  }

  public static getWords(): string[] {
    return Array.from(this.words.values());
  }

  public static hasWord(word: string): boolean {
    return this.words.has(word);
  }
}
