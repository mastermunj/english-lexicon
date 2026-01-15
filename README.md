# english-lexicon

A comprehensive collection of English dictionary words aggregated from multiple public domain sources.

## Features

- **525,000+ unique English words** - One of the largest collections available
- **Multiple sources** - Aggregated from 16+ trusted word lists
- **Simple API** - Just two methods: `getWords()` and `hasWord()`
- **Efficient lookups** - Uses `Set` for O(1) word existence checks
- **Zero runtime dependencies** - Lightweight and fast

## Installation

```bash
npm install english-lexicon
```

## Usage

```typescript
import { EnglishLexicon } from 'english-lexicon';

// Get all words as an array
const words = EnglishLexicon.getWords();
console.log(`Total words: ${words.length}`);

// Check if a word exists
console.log(EnglishLexicon.hasWord('hello'));     // true
console.log(EnglishLexicon.hasWord('xyzzy123'));  // false
```

## API

### `EnglishLexicon.getWords(): string[]`

Returns an array of all words in the lexicon.

### `EnglishLexicon.hasWord(word: string): boolean`

Checks if a word exists in the lexicon. Returns `true` if found, `false` otherwise.

## Word Sources

The word list is aggregated from these public domain sources:

- [dwyl/english-words](https://github.com/dwyl/english-words) - ~466k words
- [lorenbrichter/Words](https://github.com/lorenbrichter/Words) - Letterpress game words
- [sindresorhus/word-list](https://github.com/sindresorhus/word-list) - Curated word list
- [first20hours/google-10000-english](https://github.com/first20hours/google-10000-english) - Frequency-based lists
- [MIT wordlists](https://www.mit.edu/~ecprice/wordlist.10000) - 10k and 100k lists
- [dolph/dictionary](https://github.com/dolph/dictionary) - Unix words
- [en-wl/wordlist](https://github.com/en-wl/wordlist) - SCOWL-based lists
- [Wikipedia word frequency](https://github.com/IlyaSemenov/wikipedia-word-frequency)
- [Moby Project](https://github.com/words/moby)


## Use Cases

- **Spell checking** - Validate if user input contains real words
- **Word games** - Wordle, Scrabble, crossword puzzle solvers
- **Text analysis** - Filter valid English words from text
- **Auto-completion** - Suggest words based on prefix
- **Educational apps** - Vocabulary building, word learning

## License

MIT
