# Wroomz Frontend — Claude Context

React 19 + TypeScript SPA for endurance karting race management. CRA-based, deployed as Docker (nginx-alpine) on Railway.

## Three-repo layout

Wroomz lives in three sibling repos under `/Users/eugene/dev/`:

- `wroomz-frontend` (this repo) — React SPA.
- `../wroomz-backend` — Express / TypeORM / Postgres API. Consumed by this app.
- `../wroomz-types` — shared npm package `@evhandel/wroomz-types`. Provides API DTOs, domain types, and DB model shapes to both frontend and backend.

Cross-repo workflow: to change a shared type, edit `../wroomz-types/src/`, bump the version, `npm publish`, then update the `@evhandel/wroomz-types` version in this repo's `package.json`. See `../wroomz-types/CLAUDE.md` for the full publish flow. When iterating locally, `package.json` here can point at `file:../wroomz-types` — but that path **does not resolve in CI/Railway** and must be reverted to a published version before deploy.

## Architecture at a glance

Two self-contained features in `src/features/`:

- **raceEditor** — protected, create/edit races. State is a Zustand store wrapped in a React Context provider:
  - Store: `src/features/raceEditor/store/raceEditorStore.ts` (exports `createRaceEditorStore`, `RaceEditorState`, `RaceEditorStoreState`).
  - Provider: `src/features/raceEditor/store/RaceEditorStoreProvider.tsx` (lazy init via `useRef`, selector-based `useStore`).
  - Initial state + wire-format migrations: `src/features/raceEditor/context/raceEditorReducer.ts` (`getInitialState` at line 183).
  - Persisted to `localStorage` via a state subscriber at `raceEditorStore.ts:245-262`. Keys: `settings`, `teams`, `stintsByPilots`, `stintOverrides`, `penaltiesManual`, `disqualifiedTeams`.
- **raceViewer** — public read-only analytics. No Zustand; pulls via React Query in `src/features/raceViewer/data/useRaceData.ts` with queryKey `["race", raceId]`. The hook validates that `calculatedData`, `results`, `penalties`, and `settings` are present (lines 10–16) and throws otherwise.

Central editor data type: `CalculatedData` at `src/features/raceEditor/types.ts:7-12` — `results | stintsAnalysis | penalties | settingsData`.

## Pipeline: CSV → persisted race

1. `src/features/raceEditor/components/CSVUploader/CSVUploader.tsx` parses the CSV via PapaParse.
2. Parsed rows go into the store (`setRaceData`).
3. User clicks Calculate; the `calculate` action at `raceEditorStore.ts:128-150` runs `getStintsAnalysis`, `getPenaltiesByStintLimit`, `getPenaltiesByPilotLimit` and writes `CalculatedData` back into the store.
4. Save triggers `api.races.update` / `api.races.create`.

## Providers chain

See `src/App.tsx:80-95`. Order is load-bearing:

```
QueryClientProvider (81)
  ThemeProvider (82)
    CssBaseline (83)
      AuthProvider (84)
        SnackbarProvider (85)
          Router (86)
            ReauthProvider (87)      ← must be inside AuthProvider
              Layout (88)
                ErrorBoundary (89)
                  Routes (90+)
```

## API layer

- Axios instance: `src/api/apiClient.ts`. Base URL `process.env.REACT_APP_API_URL` (default `http://localhost:3005/api`, line 11).
- 401 interceptor (lines 38–55) calls `getReauthFn()` from `src/context/ReauthContext.tsx` to open the re-login modal, then retries the original request with `_isRetry`. 403 is returned as-is (line 57) — no automatic retry.
- Endpoint objects: `src/api/auth.ts` (`authApi`), `src/api/races.ts` (`racesApi`), `src/api/admin.ts` (`adminApi`). All exposed through the `api` namespace in `src/api/index.ts`.
- Types are re-exports from `@evhandel/wroomz-types` (e.g. `AuthUser = AuthUserResponse`, `Race = RaceResponse`).
- Auth persistence keys: `authToken`, `authUser` (`src/api/auth.ts:13-14, 21, 29-30`).

## Routing & guards

`src/App.tsx` defines two inline guard components used by `<Routes>`:

- `ProtectedRoute` (lines 26–52) — requires `isAuthenticated`; proactively logs out on `isTokenExpired()`; redirects to `/login?returnTo=<path>`.
- `SuperadminRoute` (lines 54–77) — composes `ProtectedRoute` + `user.role === 'SUPERADMIN'`. Non-superadmins get a snackbar and `<Navigate to='/' />`.

Public registration is removed. Superadmin creates team-user accounts via `/admin/users` (list + create) and `/admin/users/:id` (edit) forms in `src/pages/admin/`.

## Roles / teams feature

- `src/features/teams/logoMap.ts` — `TEAM_LOGOS: Record<string, string>`, `getTeamLogo(key)`, `LOGO_KEYS`. To add a new team logo: drop the SVG into `src/assets/teamLogos/`, import it, add one entry to `TEAM_LOGOS`. The admin form's logo dropdown is derived from `LOGO_KEYS`.
- `AuthContext` exposes `user`, `isAuthenticated`, `isSuperadmin` (`src/context/AuthContext.tsx:60`).
- `Layout` shows a team avatar + `teamName` for TEAM users, and a clickable `SUPERADMIN` chip (links to `/admin/users`) for superadmins. Footer at `src/components/Layout.tsx:110-128` (flat file — there is no nested `Layout/Layout.tsx`).

## Gotchas

- **Minutes ↔ seconds.** Editor UI shows `maxStint` and `minForPilotByTeamSize` in **minutes**; the backend stores them in **seconds**. Conversion at `raceEditorReducer.ts:172` (seconds → minutes for UI) and `raceEditorStore.ts:138` (minutes → seconds on save).
- **`lapsNotDelimiters` vs `stintOverrides`.** Backend field `lapsNotDelimiters` is renamed to `stintOverrides` on the frontend at `raceEditorReducer.ts:195`. Semantically: lap numbers where a stint boundary should be forced.
- **Dates on the wire are strings** (`createdAt: string`); parse with `date-fns` / `luxon` when needed.
- **UI language: default English.** Some legacy strings in `src/context/ReauthContext.tsx:128, 167` (dialog title and primary button) and `src/pages/Login.tsx:65` (session-expired banner) are still in Russian. Leave legacy strings alone; only write Russian copy when the user explicitly asks.
- **Hardcoded branding**: `public/index.html:46` (title), `public/manifest.json:2-3`, `src/assets/wroomz-logo.svg`, footer in `src/components/Layout.tsx`. Theme: `src/theme/theme.ts` (dark mode, Rubik font).

## Dev commands

- `yarn start` — CRA dev server on port 3006 (from `.env.development`).
- `yarn build` — production build.
- `yarn format` — Prettier across the tree.
- `.env.development.example` exists; there is no `.env.example`, no CI config, and no pre-commit hooks.

## Domain glossary (1 line each)

- **stint** — a continuous driving segment by one pilot in one kart.
- **pilot** — driver, scoped to a team.
- **kart** — physical vehicle; kart numbers appear in raw CSV and drive deduping.
- **lapsNotDelimiters** — backend-side name for `stintOverrides`: lap numbers on which stints must be force-split.
- **penalty** — time added to a team's result (from stint/pilot/manual rules).
- **stintsQuantity** — per-race setting capping number of stints per team.
- **minForPilotByTeamSize** — minimum driving time per pilot, keyed by team size (2/3/4…), shown in minutes in the UI.
