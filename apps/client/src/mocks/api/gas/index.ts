import { rest } from 'msw';

const API_URL = import.meta.env.VITE_API_BASE_URL || '';

export const getGasList = rest.get(
  `${API_URL}/api/gas/list`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: 200,
        list: [
          {
            year: 2023,
            month: 1,
            amount: 7000,
          },
          {
            year: 2022,
            month: 12,
            amount: 6000,
          },
          {
            year: 2022,
            month: 11,
            amount: 6000,
          },
          {
            year: 2022,
            month: 10,
            amount: 5000,
          },
          {
            year: 2022,
            month: 9,
            amount: 5500,
          },
          {
            year: 2022,
            month: 8,
            amount: 4000,
          },
          {
            year: 2022,
            month: 7,
            amount: 4500,
          },
          {
            year: 2022,
            month: 6,
            amount: 4000,
          },
          {
            year: 2022,
            month: 5,
            amount: 5000,
          },
          {
            year: 2022,
            month: 4,
            amount: 6000,
          },
          {
            year: 2022,
            month: 3,
            amount: 6500,
          },
          {
            year: 2022,
            month: 2,
            amount: 7500,
          },
        ],
      }),
    );
  },
);
