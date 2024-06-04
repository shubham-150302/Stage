import { Transaction } from 'objection';

export interface IRead {
  findById<T>(modelName: string, id: number, txn?: Transaction, embed?: string): Promise<T>;
}
