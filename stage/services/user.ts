import { Service } from '@hapipal/schmervice';
import { User } from '@interfaces/user';

export default class UserService extends Service {
  async findUserByAuth0Id({ auth0Id }: { auth0Id: string; }) {
    const { userRepository } = this.server.services();
    const user = await userRepository.findByAuthId<User>({ auth0Id });
    return user;
  }
}

declare module '@hapipal/schmervice' {
  interface RegisteredServices {
    userService: UserService;
  }
}
