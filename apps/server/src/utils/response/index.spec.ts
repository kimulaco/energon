import { createResponse, createErrorResponse } from './index';

describe('createResponse', () => {
  it('Generated the expected object', async () => {
    const response = createResponse(200, {
      message: 'Success',
    });

    expect(response).toEqual({
      statusCode: 200,
      message: 'Success',
    });
  });
});

describe('createErrorResponse', () => {
  it('not setting data', async () => {
    const response = createErrorResponse(404, 'Not found');

    expect(response).toEqual({
      statusCode: 404,
      message: 'Not found',
    });
  });

  it('setting data', async () => {
    const response = createErrorResponse(500, 'Internal server error', {
      errorCode: '500_1',
    });

    expect(response).toEqual({
      statusCode: 500,
      message: 'Internal server error',
      errorCode: '500_1',
    });
  });
});
