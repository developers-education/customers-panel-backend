import { uuidv7 } from 'uuidv7';

export class Customer {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: Date;
  email: string;
  phone: string | null;

  constructor(data: CustomerParams) {
    this.id = data.id ?? uuidv7();
    this.userId = data.userId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.idNumber = data.idNumber;
    this.birthDate =
      data.birthDate instanceof Date
        ? data.birthDate
        : new Date(data.birthDate);
    this.email = data.email;
    this.phone = data.phone ?? null;
  }

  public toPlain(): CustomerPlain {
    return {
      id: this.id,
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      idNumber: this.idNumber,
      birthDate: this.birthDate,
      email: this.email,
      phone: this.phone,
    };
  }
}

export type CustomerParams = {
  id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: Date | string;
  email: string;
  phone?: string | null;
};

export type CustomerPlain = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: Date;
  email: string;
  phone: string | null;
};
