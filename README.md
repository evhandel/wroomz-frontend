# Wroomz Frontend

A web application for managing and analyzing endurance karting races. Allows organizers to create races, upload data from CSV files, configure pit stop rules and penalties, and provides spectators with detailed race analytics.

## Project Structure

```
src/
├── api/
│   ├── apiClient.ts              # Axios instance, interceptors
│   ├── auth.ts                   # Auth API methods
│   ├── races.ts                  # Races CRUD methods
│   └── index.ts                  # Barrel re-export
├── context/
│   ├── AuthContext.tsx            # Authentication context (JWT)
│   └── SnackbarContext.tsx        # Snackbar notifications
├── components/
│   ├── Layout.tsx                # Shared layout (header, footer)
│   ├── RaceForm/                 # Reusable race form component
│   ├── PenaltyList.tsx           # Penalty list display
│   └── PenaltyText.tsx           # Penalty text formatting
├── theme/
│   ├── theme.ts                  # MUI theme with custom tokens
│   ├── theme.types.ts            # Theme type augmentation
│   └── index.ts                  # Theme barrel export
├── pages/
│   ├── RaceList.tsx              # Race list (home page)
│   ├── ViewRace.tsx              # Race view (public)
│   ├── NewRace.tsx               # Create race (protected)
│   ├── EditRace.tsx              # Edit race (protected)
│   ├── Login.tsx                 # Login
│   └── Register.tsx              # Registration
├── features/
│   ├── raceEditor/               # Race creation and editing
│   │   ├── components/
│   │   │   ├── Main/             # Editor orchestrator
│   │   │   ├── CSVUploader/      # CSV upload and parsing
│   │   │   ├── Settings/         # Race settings
│   │   │   ├── Teams/            # Team/pilot management
│   │   │   ├── StintsByPilots/   # Pilot-to-stint assignment
│   │   │   ├── AutoPenalties/    # Automatic penalties
│   │   │   ├── ManualPenalties/  # Manual penalties
│   │   │   ├── Results/          # Results preview
│   │   │   └── common/styles.ts  # Shared editor styles
│   │   ├── context/              # Race editor state (useReducer)
│   │   ├── utils/                # getStintsAnalysis, getPenalties...
│   │   ├── hooks/                # useRaceCalculation, useStintSelection
│   │   └── types.ts              # CalculatedData and related types
│   └── raceViewer/               # Race viewing and analytics
│       ├── components/
│       │   ├── Main/             # Viewer orchestrator
│       │   ├── Results/          # Final results table
│       │   ├── LapsTable/        # Lap-by-lap table
│       │   │   └── components/
│       │   │       └── LapCell/  # Lap cell (styling: best, pit, penalty)
│       │   ├── StintsTable/      # Stints table
│       │   │   └── components/
│       │   │       └── ComboTableCell/ # Combo cell (value + label)
│       │   ├── ChartBase/        # Shared chart wrapper
│       │   ├── LapTimesChart/    # Lap times line chart
│       │   ├── DeltaTimesChart/  # Delta times chart (gaps between teams)
│       │   ├── PenaltiesTable/   # Penalties breakdown table
│       │   └── common/styles.ts  # Shared viewer styles
│       ├── data/                 # useRaceData, stintsAnalysis, lapByLap
│       └── helpers/              # format, colors, createChartTooltip
└── App.tsx                       # Routing, MUI theme, ProtectedRoute
```

### Component File Convention

Each component folder may contain the following files:

| Suffix | Purpose | Example |
|--------|---------|---------|
| `.tsx` | Component | `Teams.tsx` |
| `.types.ts` | TypeScript prop interfaces | `Teams.types.ts` |
| `.styles.ts` | Styles (Emotion / styled-components) | `Teams.styles.ts` |
| `.constants.ts` | Default values, constants | `Settings.constants.ts` |
| `.data.ts` | Data preparation for display | `StintsTable.data.ts` |
| `.tooltip.ts` | Custom Chart.js tooltips | `LapTimesChart.tooltip.ts` |

## Key Features

### Race Editor (protected routes)
- Upload race data from CSV (team numbers, lap times)
- Manage teams and pilots (2–4 pilots per team)
- Configure rules: max stint duration, min pilot time, min pit stop time
- Automatic penalty calculation (stint limit exceeded, pilot time undercut)
- Manual penalty assignment
- Results preview with calculations
- State persistence via localStorage

### Race Viewer (public routes)
- Final results table with penalty adjustments
- Stints table with average times, best laps, pit stop times
- Detailed lap-by-lap table
- Lap times line chart
- Delta times chart (gaps between teams)
- Penalties table with breakdown by type

## Routes

| Path | Page | Access |
|------|------|--------|
| `/` | Race list | Public |
| `/races/:id` | Race view | Public |
| `/login` | Login | Public |
| `/register` | Registration | Public |
| `/races/new` | Create race | Auth required |
| `/races/:id/edit` | Edit race | Auth required |

## API

Backend URL: `REACT_APP_API_URL` (defaults to `http://localhost:3005/api`)

```
POST   /auth/login          # Login (email, password) → { token, user }
POST   /auth/register       # Register → { token, user }

GET    /public/races         # List all races
GET    /public/races/:id     # Race details

POST   /races               # Create race (Bearer token)
PUT    /races/:id            # Update race (Bearer token)
DELETE /races/:id            # Delete race (Bearer token)
```

Authentication: JWT token in `Authorization: Bearer <token>` header, stored in localStorage.

## Setup

```bash
# Clone the repository
git clone <url>
cd wroomz-frontend

# Install dependencies
yarn install

# Create .env (or copy .env.development.example)
echo "REACT_APP_API_URL=http://localhost:3005/api" > .env.development

# Start dev server (port 3006)
yarn start
```

## Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Dev server on port 3006 |
| `yarn build` | Production build |
| `yarn test` | Run tests |
| `yarn format` | Format code (Prettier) |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:3005/api` |
| `PORT` | Dev server port | `3006` |

## Docker & Deployment

Multi-stage build:
1. **Build** — Node 20-alpine: `yarn install` → `react-scripts build` (REACT_APP_API_URL passed as build arg)
2. **Runtime** — nginx-alpine: static file serving with gzip compression, SPA routing, caching (1 year for assets), security headers

```bash
docker build --build-arg REACT_APP_API_URL=https://api.example.com -t wroomz-frontend .
docker run -p 80:80 wroomz-frontend
```

Deployed on Railway via `railway.json` with automatic `PORT` substitution.

## Code Style

Prettier (`.prettierrc`):
- `singleQuote: true`, `jsxSingleQuote: true`
- `printWidth: 100`, `tabWidth: 4`
- `trailingComma: "es5"`, `semi: true`
- `arrowParens: "always"`

TypeScript (`tsconfig.json`):
- `target: ES5`, `strict: true`
- `noUnusedLocals: true`, `noUnusedParameters: true`
- `jsx: react-jsx` (automatic transform)

## Architecture

- **Feature-based structure**: `raceEditor` and `raceViewer` are independent modules with their own components, hooks, and utilities
- **Two-tier penalty system**: automatic (rule-based) + manual (organizer-assigned)
- **Data pipeline**: CSV → PapaParse → settings → stint/penalty calculation → API
- **Dark theme**: custom MUI theme with dark palette (background `#050505`, Rubik italic for headings), custom color tokens for charts and tables
- **State management**: React Query for server state, Context API for authentication and editor state, localStorage for editor drafts
- **Provider chain (App.tsx)**: `QueryClientProvider` → `ThemeProvider` → `AuthProvider` → `SnackbarProvider` → `Router` → `Layout` → `Routes`

## Data Flow

### Creating/editing a race
```
CSV file → CSVUploader (PapaParse) → raw lap data
  → Teams: assign pilots to teams (2–4 pilots)
  → Settings: race rules (maxStint, minPilot, minPitStop)
  → StintsByPilots: assign pilots to stints
  → Calculate: getStintsAnalysis() → getPenaltiesByStintLimit() + getPenaltiesByPilotLimit()
  → ManualPenalties: manual adjustments
  → CalculatedData → API: POST/PUT /races
```

### Viewing a race
```
API: GET /public/races/:id → useRaceData() (React Query + select)
  → Main → Results, LapsTable, StintsTable, LapTimesChart, DeltaTimesChart, PenaltiesTable
```
