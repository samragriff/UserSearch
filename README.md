# User Search

User search feature with C# minimal API (MediatR, Ardalis.Result, SQLite) and React frontend (TanStack Query, react-hook-form).


## How to Run

### API

```bash
cd API
dotnet run --project UserSearch.API
```

Runs at http://localhost:5243. SQLite DB (`usersearch.db`) is created on first run. If empty, 12 seed users are inserted automatically.

### Web

```bash
cd Web
npm install
npm run dev
```

Runs at http://localhost:5173. Proxies `/api` to the API.

**Start the API first** so the Web proxy can reach it.

## Tech Stack

- **API**: .NET 10, Minimal API, MediatR, Ardalis.Result, EF Core SQLite
- **Web**: React 19, Vite, TanStack React Query, Axios, react-hook-form
