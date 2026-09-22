import type { Core } from '@strapi/strapi';
import type { Context, Next } from 'koa';

const WINDOW_MS = Number(
  process.env.RATE_LIMIT_WINDOW_MS ?? 300000,
);

const MAX_REQUESTS = Number(
  process.env.RATE_LIMIT_MAX_REQUESTS ?? 5,
);

const requests = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

export default (
  _config: unknown,
  { strapi }: { strapi: Core.Strapi },
) => {
  return async (ctx: Context, next: Next): Promise<void> => {
    const ip = ctx.ip;
    const now = Date.now();

    const record = requests.get(ip);

    if (!record || now >= record.resetAt) {
      requests.set(ip, {
        count: 1,
        resetAt: now + WINDOW_MS,
      });

      await next();
      return;
    }

    if (record.count >= MAX_REQUESTS) {
      strapi.log.warn(`Contact rate limit exceeded for IP: ${ip}`);

      ctx.status = 429;
      ctx.body = {
        error: {
          status: 429,
          name: 'TooManyRequestsError',
          message: 'Too many requests, please try again later.',
        },
      };

      return;
    }

    record.count += 1;

    await next();
  };
};