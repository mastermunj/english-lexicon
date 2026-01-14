import { describe, expect, test } from 'vitest';
import { Greeter } from '../src/greeter';

describe('Greeter', () => {
  const name = 'Jim';
  const greeter = new Greeter(name);

  test(`Test name: ${name}`, () => {
    expect(greeter.greet()).toBe(`Hello ${name}!`);
  });
});
