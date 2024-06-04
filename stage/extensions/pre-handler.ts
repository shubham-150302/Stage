import * as Toys from '@hapipal/toys';
import { RequestHeaders } from '@interfaces/common';

export default Toys.onPreHandler(
  async (request, h) => {
    const { headers } = request;
    // locale
    request.pre.locale = headers[RequestHeaders.LOCALE];

    return h.continue;
  },
  {
    sandbox: 'plugin',
  },
);
