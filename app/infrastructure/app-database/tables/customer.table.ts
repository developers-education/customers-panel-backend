import { TableBase } from './base';

export type CustomerTable = TableBase & {
  id: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: Date;
  email: string;
  phone: string | null;
};
