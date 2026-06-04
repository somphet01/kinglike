# Kinglike Admin Setup

## Current Setup

- Storefront pages are public.
- `admin.html` and `admin-orders.html` require an admin login.
- Public customers can read `/api/store`.
- Only logged-in admins can update `/api/store`, read `/api/orders`, or update order status.
- The current server database is SQLite:
  - `data/kinglike.db`
- The app now uses a database backend wrapper:
  - `database.js` selects the backend.
  - `db/sqlite-database.js` contains the current SQLite implementation.
  - Default backend: `sqlite`
- Legacy JSON files are kept as migration/backup sources:
  - `data/store.json`
  - `data/orders.json`

## Local admin login

Default password:

```text
kinglike2026
```

Change it when starting the server:

```powershell
$env:ADMIN_PASSWORD="your-strong-password"; node server.js
```

For production, also set a stable secret:

```powershell
$env:SESSION_SECRET="a-long-random-secret"; node server.js
```

## Database backend

Keep SQLite for the current shop:

```powershell
$env:DATABASE_BACKEND="sqlite"; node server.js
```

`DATABASE_BACKEND=supabase` is intentionally reserved for the future cloud database adapter. Do not enable it until the Supabase project, server-side key handling, tables, RLS policies, and storage are configured.

## Production Recommendation

For a real hosted site, keep this shape:

- Public storefront: customer pages only
- Private admin: protected by login
- Database: SQLite is fine for a first hosted VPS/server.
- Upgrade to Postgres/Supabase when the store needs multi-admin editing, analytics, or cloud backups.

Do not publish the admin password in frontend code.

## Backup Notes

Do not commit real database files to GitHub:

```text
data/kinglike.db
data/kinglike.db-shm
data/kinglike.db-wal
```

Back up the database file from the server regularly.
