export interface IDeleteCustomerCase {
  execute(id: string): Promise<void>;
}
