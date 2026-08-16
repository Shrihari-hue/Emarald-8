# Emarald-8

Nx workspace (`pnpm@11.22.0`): Nest API, BullMQ worker, Next apps, shared Prisma models.

| App / lib | Package                | Default URL                                                   |
| --------- | ---------------------- | ------------------------------------------------------------- |
| Backend   | `@org/backend`         | http://localhost:8000/api                                     |
| Auth      | Better Auth on the API | http://localhost:8000/api/auth/ok                             |
| Worker    | `@org/worker`          | BullMQ process (Redis), no HTTP port                          |
| Web       | `@org/web`             | http://localhost:3000 (`/api/auth/*` rewrites to the backend) |
| Marketing | `@org/marketing`       | http://localhost:3001                                         |
| Models    | `@org/models`          | Prisma schema in `packages/models/prisma`                     |

Prefix every Nx command with `pnpm`.

## Setup

```sh
pnpm install
cp .env.example .env
```

Set `BETTER_AUTH_SECRET` (32+ characters):

```sh
openssl rand -base64 32
```

`.env` is gitignored. Required keys are in `.env.example`.

Postgres must be reachable at `DATABASE_URL` (default `postgresql://postgres:postgres@localhost:5432/emarald`).
Redis must be reachable at `REDIS_URL` (default `redis://localhost:6379`) for the worker.

## Prisma (`@org/models`)

```sh
pnpm nx run @org/models:prisma -c generate
pnpm nx run @org/models:prisma -c migrate:dev -- --name <migration_name>
pnpm nx run @org/models:prisma -c migrate:deploy
pnpm nx run @org/models:prisma -c migrate:reset
pnpm nx run @org/models:prisma -c migrate:resolve
pnpm nx run @org/models:prisma -c studio
```

Equivalent filter scripts:

```sh
pnpm --filter @org/models prisma:generate
pnpm --filter @org/models prisma:migrate:dev
pnpm --filter @org/models prisma:migrate:deploy
pnpm --filter @org/models prisma:migrate:reset
pnpm --filter @org/models prisma:migrate:resolve
pnpm --filter @org/models prisma:studio
```

## Develop

```sh
pnpm nx serve @org/backend
pnpm nx serve @org/backend --configuration=development
pnpm nx serve @org/backend --configuration=production

pnpm nx serve @org/worker
pnpm nx serve @org/worker --configuration=development
pnpm nx serve @org/worker --configuration=production

pnpm nx dev @org/web
pnpm nx start @org/web
pnpm nx serve-static @org/web

pnpm nx dev @org/marketing
pnpm nx start @org/marketing
pnpm nx serve-static @org/marketing
```

`pnpm nx dev @org/web` also starts `@org/backend:serve`.

Auth health check (API running):

```sh
curl http://localhost:8000/api/auth/ok
```

## Build, lint, test, format

```sh
pnpm nx build @org/backend
pnpm nx build @org/worker
pnpm nx build @org/web
pnpm nx build @org/marketing
pnpm nx run-many -t build

pnpm nx typecheck @org/backend
pnpm nx typecheck @org/models
pnpm nx run-many -t typecheck

pnpm nx lint @org/backend
pnpm nx test @org/backend
pnpm nx run-many -t lint test build typecheck

pnpm nx format:check
pnpm nx format:write
```

e2e (not run in CI yet):

```sh
pnpm nx e2e @org/backend-e2e
pnpm nx e2e @org/web-e2e
pnpm nx e2e @org/marketing-e2e
pnpm nx run-many -t e2e
```

## Workspace

```sh
pnpm nx graph
pnpm nx show projects
pnpm nx show project @org/backend
pnpm nx sync
pnpm nx sync:check
pnpm nx affected -t build --base=main --head=HEAD
```

## Nx

[Nx docs](https://nx.dev/docs). [Nx Console](https://nx.dev/docs/getting-started/editor-setup).
