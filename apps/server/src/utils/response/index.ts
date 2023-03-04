export type Response<T> = T & {
  statusCode: number;
};

export type ErrorResponse<T> = Response<T> & {
  message: string;
};

export const createResponse = <T>(
  statusCode: number,
  data?: T,
): Response<T> => {
  return {
    ...data,
    statusCode,
  };
};

export const createErrorResponse = <T>(
  statusCode: number,
  message: string,
  data?: T,
): ErrorResponse<T> => {
  return {
    ...data,
    message,
    statusCode,
  };
};
