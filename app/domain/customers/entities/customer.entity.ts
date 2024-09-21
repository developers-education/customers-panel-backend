import { uuidv7 } from 'uuidv7';

export class Customer {
  id: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: Date;
  email: string;
  phone: string | null;

  constructor(data: CustomerParams) {
    this.id = data.id ?? uuidv7();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.idNumber = data.idNumber;
    this.birthDate = data.birthDate;
    this.email = data.email;
    this.phone = data.phone ?? null;
  }

  public toPlain(): CustomerPlain {
    return {
      id: this.id,
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
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: Date;
  email: string;
  phone?: string;
};

export type CustomerPlain = {
  id: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: Date;
  email: string;
  phone: string | null;
};
