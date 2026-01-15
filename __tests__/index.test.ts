import { describe, it, expect } from 'vitest';
import { EnglishLexicon } from '../src/index';

describe('EnglishLexicon', () => {
  describe('static initialization', () => {
    it('should have loaded words from serialized.json', () => {
      expect(EnglishLexicon.words.size).toBeGreaterThan(0);
    });

    it('should have wordsFile path defined', () => {
      expect(EnglishLexicon.wordsFile).toContain('serialized.json');
    });
  });

  describe('getWords', () => {
    it('should return an array of words', () => {
      const words = EnglishLexicon.getWords();
      expect(Array.isArray(words)).toBe(true);
      expect(words.length).toBeGreaterThan(0);
    });

    it('should return words as strings', () => {
      const words = EnglishLexicon.getWords();
      words.slice(0, 10).forEach((word) => {
        expect(typeof word).toBe('string');
      });
    });

    it('should return all words from the map', () => {
      const words = EnglishLexicon.getWords();
      expect(words.length).toBe(EnglishLexicon.words.size);
    });
  });

  describe('hasWord', () => {
    it('should return true for existing words', () => {
      // Get a word we know exists
      const words = EnglishLexicon.getWords();
      const existingWord = words[0];
      expect(EnglishLexicon.hasWord(existingWord)).toBe(true);
    });

    it('should return false for non-existing words', () => {
      expect(EnglishLexicon.hasWord('xyznonexistent123')).toBe(false);
    });

    it('should return true for common English words', () => {
      // These should exist in any comprehensive word list
      const commonWords = ['the', 'and', 'is', 'are', 'was', 'hello', 'world'];
      commonWords.forEach((word) => {
        expect(EnglishLexicon.hasWord(word)).toBe(true);
      });
    });

    it('should be case-sensitive (lowercase)', () => {
      const words = EnglishLexicon.getWords();
      const existingWord = words[0];
      // The word list should be lowercase
      expect(EnglishLexicon.hasWord(existingWord)).toBe(true);
      // Uppercase version should not exist (assuming list is lowercase)
      if (existingWord !== existingWord.toUpperCase()) {
        expect(EnglishLexicon.hasWord(existingWord.toUpperCase())).toBe(false);
      }
    });
  });
});
