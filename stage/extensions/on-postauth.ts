import * as Toys from '@hapipal/toys';

export default Toys.onPostAuth(
  async (request, h) => {
    const { userService } = request.services();
    const { headers } = request;

    const auth0Id = headers['x-user-id'];
    if (auth0Id) {
      request.pre.user = await userService.findUserByAuth0Id({ auth0Id });
    }

    return h.continue;
  },
  {
    sandbox: 'plugin',
  },
);
