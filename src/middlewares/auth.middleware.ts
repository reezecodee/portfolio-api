import { createMiddleware } from 'hono/factory';
import { jwt } from 'hono/jwt';

export const authMiddleware = createMiddleware(async (c, next) => {
  const secret = process.env.SUPABASE_JWT_SECRET;
  
  if (!secret) {
    throw new Error('FATAL: SUPABASE_JWT_SECRET belum diset di .env');
  }

  const jwtMiddleware = jwt({
    secret: secret,
  });

  return jwtMiddleware(c, next);
});