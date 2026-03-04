# kz-shared-ui

## Setup policy

- `.env*` files are for **local development only**.
- In container/CI environments, configure variables in the environment panel or workflow env.

## Container setup

Set this key in the container environment panel:

- `VITE_API_BASE_URL=http://localhost:3000` (example)

Then run:

```bash
npm run setup:container
```

`setup:container` runs:

1. required env check (`VITE_API_BASE_URL`)
2. `npm ci`
3. `npm run check` (lint + format:check + unit tests)
4. `npm run storybook:test` (skips gracefully if command is unavailable)

## Local development (.env)

You can keep local-only env files such as:

- `.env.local`
- `.env.development`
- `.env.test`

Example local value:

- `VITE_API_BASE_URL=http://localhost:3000`

## Main commands

```bash
npm run dev
npm run test
npm run test:watch
npm run check
npm run build
npm run storybook
npm run storybook:test
```

## Notes

- `test` is non-watch by default for non-interactive containers.
- pre-commit uses lint-staged (ESLint + Prettier only), so `tsc --noEmit` argument issues are avoided.
- `.npmrc` is intentionally minimal for container stability.
