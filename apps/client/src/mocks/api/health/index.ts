import { rest } from 'msw';

const API_URL = import.meta.env.VITE_API_BASE_URL || '';

export const getHealth = rest.get(`${API_URL}/api/health`, (req, res, ctx) => {
  return res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({
      statusCode: 200,
      health: {
        server: true,
      },
    }),
  );
});
