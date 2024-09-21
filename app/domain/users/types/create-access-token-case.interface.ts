export interface ICreateAccessTokenCase {
  execute(userId: string): Promise<string>;
}
