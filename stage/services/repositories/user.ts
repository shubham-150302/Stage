import BaseRepository from './base';

export default class UserRepository extends BaseRepository {
  async findByAuthId<T>({ auth0Id }: { auth0Id: string }): Promise<T> {
    const { UserModel } = this.server.models();
    const query = UserModel.query().where('auth0Id', auth0Id);
    return query.first() as T;
  }
}

declare module '@hapipal/schmervice' {
  interface RegisteredServices {
    userRepository: UserRepository;
  }
}
