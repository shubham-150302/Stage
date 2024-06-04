import * as Toys from '@hapipal/toys';
import { Request, ResponseToolkit } from '@hapi/hapi';
import { handleError } from '@utilities';
import { Boom } from '@hapi/boom';

export default Toys.onPreResponse(
  (request: Request, h: ResponseToolkit) => {
    const { response } = request as { response: Boom };

    if (response.isServer) {
      console.log('onPreResponse serverError', response);
    }

    if (!response.isBoom) {
      return h.continue;
    }

    const { responseBody, responseCode } = handleError(response);

    response.output.payload = responseBody; // Override the HapiJS error with custom schema
    response.output.statusCode = responseCode;

    return h.continue;
  },
  {
    sandbox: 'plugin',
  },
);
