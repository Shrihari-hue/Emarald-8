'use client';

import { createAuthClient } from 'better-auth/react';

/**
 * Same-origin auth: Next rewrites `/api/auth/*` to the Nest backend.
 * Session cookies are set for the app origin (see `next.config.js`).
 */
export const authClient = createAuthClient({
  baseURL: '',
  fetchOptions: {
    credentials: 'include',
  },
});

export const { signIn, signOut, signUp, useSession } = authClient;
