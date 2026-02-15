# User Search - Tech Test

User search feature with C# minimal API (MediatR, Ardalis.Result, SQLite) and React frontend (TanStack Query, react-hook-form).

## Acceptance Criteria

- Search shows matches after 2 characters (first or last name)
- Selecting a match displays all user fields
- Add new users to the dataset
- New searches return newly created users
- Bonus: phone and email validation
- Bonus: duplicate emails rejected

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
