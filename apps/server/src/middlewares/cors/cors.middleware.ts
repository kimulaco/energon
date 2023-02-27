import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const ACCESS_CONTROL_ALLOW_ORIGIN =
  process.env.ACCESS_CONTROL_ALLOW_ORIGIN || '';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin;

    if (origin === ACCESS_CONTROL_ALLOW_ORIGIN) {
      res.header('Access-Control-Allow-Origin', ACCESS_CONTROL_ALLOW_ORIGIN);
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.header(
        'Access-Control-Allow-Headers',
        [
          'X-Requested-With',
          'X-HTTP-Method-Override',
          'Content-Type',
          'Accept',
          'x-energon-api-token',
        ].join(','),
      );
    }

    if ('OPTIONS' == req.method) {
      res.sendStatus(204);
    } else {
      next();
    }
  }
}
