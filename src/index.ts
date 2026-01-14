export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export class Person {
  name: string;
  gender: Gender;

  constructor(name: string, gender: Gender) {
    this.name = name;
    this.gender = gender;
  }

  introduce(): string {
    return `Hi, I am ${this.name}. I am ${this.gender}`;
  }
}
