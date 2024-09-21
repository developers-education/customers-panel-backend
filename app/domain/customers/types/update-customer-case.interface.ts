export interface IUpdateCustomerCase {
  execute(id: string, data: UpdateCustomerData): Promise<void>;
}

export type UpdateCustomerData = {
  firstName?: string;
  lastName?: string;
  idNumber?: string;
  birthDate?: Date;
  email?: string;
  phone?: string;
};
