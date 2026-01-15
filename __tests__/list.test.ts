import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { List } from '../src/list';
import fs from 'node:fs';

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

// Mock fs.promises.writeFile
vi.mock('node:fs', async () => {
  const actual = await vi.importActual('node:fs');
  return {
    ...actual,
    default: {
      ...(actual as typeof fs),
      promises: {
        writeFile: vi.fn().mockResolvedValue(undefined),
      },
    },
  };
});

describe('List', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getData', () => {
    it('should fetch data from a URL', async () => {
      const mockData = 'apple\nbanana\ncherry';
      mockFetch.mockResolvedValueOnce({
        text: () => Promise.resolve(mockData),
      });

      const result = await List.getData('https://example.com/words.txt');

      expect(mockFetch).toHaveBeenCalledWith('https://example.com/words.txt');
      expect(result).toBe(mockData);
    });

    it('should handle fetch errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(List.getData('https://example.com/words.txt')).rejects.toThrow('Network error');
    });
  });

  describe('generate', () => {
    it('should fetch from all sources, dedupe, sort and write to file', async () => {
      // Mock all fetch calls to return simple word lists
      mockFetch.mockImplementation((url: string) => {
        if (url.includes('dwyl')) {
          return Promise.resolve({ text: () => Promise.resolve('apple\nbanana\ncherry') });
        } else if (url.includes('lorenbrichter')) {
          return Promise.resolve({ text: () => Promise.resolve('banana\ndate\nelder') });
        } else {
          return Promise.resolve({ text: () => Promise.resolve('fig\ngrape') });
        }
      });

      await List.generate();

      // Verify writeFile was called
      expect(fs.promises.writeFile).toHaveBeenCalled();

      // Get the written data
      const writeCall = vi.mocked(fs.promises.writeFile).mock.calls[0];
      expect(writeCall[0]).toContain('serialized.json');

      const writtenData = JSON.parse(writeCall[1] as string) as string[];
      // Should be sorted and unique
      expect(writtenData).toEqual(
        expect.arrayContaining(['apple', 'banana', 'cherry', 'date', 'elder', 'fig', 'grape']),
      );
      // Check sorted order
      for (let i = 1; i < writtenData.length; i++) {
        expect(writtenData[i] >= writtenData[i - 1]).toBe(true);
      }
    });

    it('should filter out invalid words', async () => {
      mockFetch.mockResolvedValue({
        text: () => Promise.resolve('valid\nINVALID123\n  spaces  \nword2test\nok\n\n'),
      });

      await List.generate();

      const writeCall = vi.mocked(fs.promises.writeFile).mock.calls[0];
      const writtenData = JSON.parse(writeCall[1] as string) as string[];

      expect(writtenData).toContain('valid');
      expect(writtenData).toContain('spaces');
      expect(writtenData).toContain('ok');
      expect(writtenData).not.toContain('INVALID123');
      expect(writtenData).not.toContain('word2test');
      expect(writtenData).not.toContain('');
    });

    it('should handle fetch errors gracefully and continue', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      let callCount = 0;
      mockFetch.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.reject(new Error('Network error'));
        }
        return Promise.resolve({ text: () => Promise.resolve('word') });
      });

      await List.generate();

      // Should have logged the error
      expect(consoleSpy).toHaveBeenCalled();

      // Should still write the file with words from successful fetches
      expect(fs.promises.writeFile).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should convert words to lowercase', async () => {
      mockFetch.mockResolvedValue({
        text: () => Promise.resolve('Apple\nBANANA\nCherry'),
      });

      await List.generate();

      const writeCall = vi.mocked(fs.promises.writeFile).mock.calls[0];
      const writtenData = JSON.parse(writeCall[1] as string) as string[];

      expect(writtenData).toContain('apple');
      expect(writtenData).toContain('banana');
      expect(writtenData).toContain('cherry');
      expect(writtenData).not.toContain('Apple');
      expect(writtenData).not.toContain('BANANA');
    });

    it('should remove duplicate words', async () => {
      mockFetch.mockResolvedValue({
        text: () => Promise.resolve('apple\napple\nApple\nAPPLE'),
      });

      await List.generate();

      const writeCall = vi.mocked(fs.promises.writeFile).mock.calls[0];
      const writtenData = JSON.parse(writeCall[1] as string) as string[];

      // Should only have one 'apple'
      const appleCount = writtenData.filter((w) => w === 'apple').length;
      expect(appleCount).toBe(1);
    });

    it('should handle Windows-style line endings', async () => {
      mockFetch.mockResolvedValue({
        text: () => Promise.resolve('apple\r\nbanana\r\ncherry'),
      });

      await List.generate();

      const writeCall = vi.mocked(fs.promises.writeFile).mock.calls[0];
      const writtenData = JSON.parse(writeCall[1] as string) as string[];

      expect(writtenData).toContain('apple');
      expect(writtenData).toContain('banana');
      expect(writtenData).toContain('cherry');
    });
  });
});
