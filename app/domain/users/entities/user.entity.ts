import { uuidv7 } from 'uuidv7';

export class User {
  id: string;
  login: string;
  passwordHash: string;
  salt: string;

  constructor(data: UserParams) {
    this.id = data.id ?? uuidv7();
    this.login = data.login;
    this.passwordHash = data.passwordHash;
    this.salt = data.salt;
  }
  public toPlain(): UserPlain {
    return {
      id: this.id,
      login: this.login,
      passwordHash: this.passwordHash,
      salt: this.salt,
    };
  }

  public isCorrectPasswordHash(hash: string): boolean {
    return hash === this.passwordHash;
  }
}

export type UserParams = {
  id?: string;
  login: string;
  passwordHash: string;
  salt: string;
};

export type UserPlain = {
  id: string;
  login: string;
  passwordHash: string;
  salt: string;
};
