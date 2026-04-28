# JobHub MERN

This repository is now cleaned into a production-style MERN layout:

- `client/` contains the React frontend
- `server/` contains the Express API and MongoDB integration

## Quick start

1. Install dependencies:

```bash
npm run install:all
```

2. Create `server/.env` from `server/.env.example`

3. Start the full stack app:

```bash
npm run dev
```

## Default ports

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

In development, Vite proxies `/api` requests to the Express server.

## MongoDB

Set `MONGO_URI` in `server/.env` to connect to MongoDB.

If MongoDB is not configured yet, the backend still starts with an in-memory fallback so the app remains usable during local setup.

## Authentication setup

Local email/password authentication works after the normal install.

Set a strong `JWT_SECRET` in `server/.env` for signed login tokens.

## Production build

Build the React app:

```bash
npm run build
```

Then start the Express server, which will serve the built frontend from `client/dist`:

```bash
npm start
```
