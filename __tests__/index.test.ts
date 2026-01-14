import { describe, expect, test } from 'vitest';
import { Gender, Person } from '../src/index';

describe('Person name: Jim, gender: Male', () => {
  const name = 'Jim';
  const gender = Gender.MALE;
  const person = new Person(name, gender);

  test(`Test name: ${name}`, () => {
    expect(person.name).toBe(name);
  });

  test(`Test gender: ${gender}`, () => {
    expect(person.gender).toBe(gender);
  });

  test(`introduction`, () => {
    expect(person.introduce()).toBe(`Hi, I am ${name}. I am ${gender}`);
  });
});

describe('Person name: Jill, gender: Female', () => {
  const name = 'Jill';
  const gender = Gender.FEMALE;
  const person = new Person(name, gender);

  test(`Test name: ${name}`, () => {
    expect(person.name).toBe(name);
  });

  test(`Test gender: ${gender}`, () => {
    expect(person.gender).toBe(gender);
  });

  test(`introduction`, () => {
    expect(person.introduce()).toBe(`Hi, I am ${name}. I am ${gender}`);
  });
});
