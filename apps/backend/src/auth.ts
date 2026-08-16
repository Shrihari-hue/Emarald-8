import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import type { PrismaService } from '@org/models';

export function createAuth(prisma: PrismaService) {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  return betterAuth({
    /** Public auth URL in the browser (`/api/auth` is proxied from Next to this server). */
    basePath: '/api/auth',
    baseURL: process.env.BACKEND_URL || 'http://localhost:8000',
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [frontendUrl],
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      maxPasswordLength: 256,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    advanced: {
      database: {
        generateId: 'serial',
      },
      useSecureCookies: process.env.NODE_ENV === 'production',
      defaultCookieAttributes: {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;
