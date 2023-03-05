import { rest } from 'msw';

const API_URL = import.meta.env.VITE_API_BASE_URL || '';

const TEST_USER = {
  id: 'tester',
  name: 'Tester',
  token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
};

export const getUserInfo = rest.get(
  `${API_URL}/api/user/:id`,
  (req, res, ctx) => {
    const { id } = req.params;

    if (id !== TEST_USER.id) {
      return res(
        ctx.delay(1000),
        ctx.status(401),
        ctx.json({
          statusCode: 401,
          message: 'Unauthorized',
        }),
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        statusCode: 200,
        user: TEST_USER,
      }),
    );
  },
);

export const login = rest.post(
  `${API_URL}/api/user/login`,
  async (req, res, ctx) => {
    const { id, password } = await req.json<{ id: string; password: string }>();
    console.log(id, password);

    if (id !== TEST_USER.id || password !== 'energonpass') {
      return res(
        ctx.delay(1000),
        ctx.status(401),
        ctx.json({
          statusCode: 401,
          message: 'Unauthorized',
        }),
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        statusCode: 200,
        user: TEST_USER,
      }),
    );
  },
);

export const logout = rest.post(
  `${API_URL}/api/user/logout`,
  (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        statusCode: 200,
      }),
    );
  },
);
