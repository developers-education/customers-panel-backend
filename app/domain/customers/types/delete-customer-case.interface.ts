export interface IDeleteCustomerCase {
  execute(userId: string, id: string): Promise<void>;
}
