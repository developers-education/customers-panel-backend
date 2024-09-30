export interface ICreateCustomerCase {
  execute(userId: string, params: CreateCustomerParams): Promise<void>;
}

export type CreateCustomerParams = {
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: Date;
  email: string;
  phone?: string;
};
