import { Transaction } from 'objection';

export interface IWrite {
  create<T>(modelName: string, data: T, txn?: Transaction): Promise<T>;
  update<T>(modelName: string, id: number, data: T, txn?: Transaction): Promise<boolean>;
}
