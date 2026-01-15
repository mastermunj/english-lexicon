import fs from 'node:fs';
import path from 'node:path';

const sources = [
  'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt',
  'https://raw.githubusercontent.com/lorenbrichter/Words/master/Words/en.txt',
  'https://raw.githubusercontent.com/sindresorhus/word-list/main/words.txt',
  'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english.txt',
  'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa.txt',
  'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa-no-swears.txt',
  'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt',
  'https://raw.githubusercontent.com/first20hours/google-10000-english/master/20k.txt',
  'https://www.mit.edu/~ecprice/wordlist.10000',
  'https://www.mit.edu/~ecprice/wordlist.100000',
  'https://raw.githubusercontent.com/dolph/dictionary/master/popular.txt',
  'https://raw.githubusercontent.com/dolph/dictionary/master/unix-words',
  'https://raw.githubusercontent.com/en-wl/wordlist/master/alt12dicts/2of12.txt',
  'https://raw.githubusercontent.com/en-wl/wordlist/master/alt12dicts/2of12inf.txt',
  'https://raw.githubusercontent.com/IlyaSemenov/wikipedia-word-frequency/master/results/enwiki-2023-04-13.txt',
  'https://raw.githubusercontent.com/words/moby/master/words.txt',
];

export class List {
  static async getData(url: string): Promise<string> {
    const response = await fetch(url);
    return response.text();
  }

  // a method to fetch data from all sources using fetch method, merges the data together, splits by new line, removes duplicates, sorts them and writes the final list to a text file
  static async generate(): Promise<void> {
    const allWords: Set<string> = new Set();

    for (const url of sources) {
      try {
        const data = await this.getData(url);
        const words = data
          .split(/\r?\n/)
          .map((word) => word.trim().toLowerCase())
          .filter((word) => word.length > 0 && /^[a-z]+$/.test(word));
        words.forEach((word) => allWords.add(word));
      } catch (error) {
        console.error(`Failed to fetch from ${url}:`, error);
      }
    }

    const sortedWords = Array.from(allWords).sort();

    const wordsFile = path.join(path.dirname(__dirname), 'data', 'serialized.json');
    await fs.promises.writeFile(wordsFile, JSON.stringify([...sortedWords]), 'utf-8');
  }
}

(async (): Promise<void> => {
  await List.generate();
})();
