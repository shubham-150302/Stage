import { Boom, Payload } from '@hapi/boom';
import Constants from '@constants';

const { ERROR_MESSAGE } = Constants;

type ResponseBody<T> = {
  result: boolean;
  data?: T;
  messages?: string[];
  error?: {
    code: string | number;
    message: string;
    statusCode?: number;
    data?: object;
    cause?: string;
  };
};

export const prepareResponse = <T>({
  success = true,
  data,
  messages,
}: {
  success: boolean;
  data?: T;
  messages?: string[];
}): ResponseBody<T> => {
  const responseBody: ResponseBody<T> = {
    result: success,
    data,
    messages,
  };

  if (data) {
    responseBody.data = data;
  } else if (success && !data) {
    responseBody.data = {} as T;
  }

  if (messages?.length > 0) {
    responseBody.messages = messages;
  }

  return responseBody;
};

// TODO: Use Generic Type and fix the responseBody schema
export const handleError = (
  err: Boom,
): {
  responseBody: any;
  responseCode: number;
} => {
  const responseBody: ResponseBody<unknown> = {
    result: false,
  };
  let responseCode = 500;

  if (err) {
    if (err.isBoom) {
      const { statusCode } = err.output;

      let payload;
      // To handle outbound calls HTTP errors
      if (err.data && err.data.isResponseError) {
        try {
          const res = JSON.parse(err.data.payload.toString());
          if (res.error) {
            payload = {
              error: res.error.code,
              message: res.error.message,
            };
          }
        } catch (error) {
          // Silent
        }
      }

      if (!payload) {
        payload = err.output.payload;
      }

      const { error, message } = payload as Payload;
      if (!err.isServer) {
        responseCode = statusCode;
      }

      responseBody.error = {
        code: error,
        message: statusCode === 429 ? ERROR_MESSAGE.MAX_ATTEMPT_LIMIT_REACHED : message,
        statusCode: responseCode,
      };

      // utilities/error handling.
      try {
        const parsed = JSON.parse(message);

        if (parsed.error_code) {
          responseBody.error.code = parsed.error_code || parsed.error.code || err.name;
          responseBody.error.message = parsed.error_description || err.message;

          if (parsed.data) {
            responseBody.error.data = parsed.data;
          }
        }
      } catch (e) {
        // Silent
      }
    }
  }

  return {
    responseBody,
    responseCode,
  };
};

// Compatible with DreamAuth ApiSpec
export const handleErrorV2 = (
  err: Boom,
): {
  responseBody: any;
  responseCode: number;
} => {
  const responseBody: ResponseBody<unknown> = {
    result: false,
  };
  let responseCode = 500;

  if (err) {
    if (err.isBoom) {
      const { statusCode } = err.output;

      let payload;
      // To handle outbound calls HTTP errors
      if (err.data && err.data.isResponseError) {
        try {
          const res = JSON.parse(err.data.payload.toString());
          if (res.error) {
            payload = {
              error: res.error.code || res.error,
              message: res.message || res.error_description,
            };
          }
        } catch (error) {
          // Silent
        }
      }
      if (!payload) {
        payload = err.output.payload;
      }

      const { error, message } = payload;
      if (!err.isServer) {
        responseCode = statusCode;
      }
      responseBody.error = {
        code: responseCode,
        message,
        cause: error,
      };

      // JSON stringify error_desciption errors
      try {
        const parsed = JSON.parse(message);
        if (parsed.error_code) {
          responseBody.error.message = parsed.error_description || err.message;
          if (parsed.data) {
            responseBody.error.data = parsed.data;
          }
        }
      } catch (e) {
        // Silent
      }
    }
  }
  return {
    responseBody,
    responseCode,
  };
};
