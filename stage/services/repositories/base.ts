import { Service } from '@hapipal/schmervice';
import { IWrite } from '@interfaces/repositories/IWrite';
import { IRead } from '@interfaces/repositories/IRead';
import { Transaction } from 'objection';

export default abstract class BaseRepository extends Service implements IWrite, IRead {
  async create<T>(modelName: string, data: T, txn: Transaction): Promise<T> {
    const model = this.server.models()[modelName];
    return model.query(txn).insert(data) as T;
  }

  async update<T>(modelName: string, id: number, data: T, txn: Transaction): Promise<boolean> {
    const model = this.server.models()[modelName];
    const numberOfAffectedRows = await model.query(txn).patch(data).where('id', id);
    return numberOfAffectedRows > 0;
  }

  async findById<T>(modelName: string, id: number, txn?: Transaction, embed?: string): Promise<T> {
    const model = this.server.models()[modelName];
    const query = model.query(txn).findById(id);

    if (embed) {
      query.withGraphFetched(embed);
    }

    return query as T;
  }
}

declare module '@hapipal/schmervice' {
  interface RegisteredServices {
    baseRepository: BaseRepository;
  }
}
