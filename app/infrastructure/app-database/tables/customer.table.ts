import { TableBase } from './base';

export type CustomerTable = TableBase & {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: string;
  email: string;
  phone: string | null;
};
