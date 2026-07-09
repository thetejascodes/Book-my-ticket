# readme
# ChaiCode Cinema — Seat Booking Demo

A minimal seat-booking demo built with Express + PostgreSQL and a small frontend served from `index.html`.

**Status:** runnable locally (requires PostgreSQL)

## Features
- Visual seat map UI served at `/`
- View all seats: `GET /seats`
- Book a seat: `PUT /:id/:name` (simple name-based booking)

## Prerequisites
- Node.js (16+ recommended)
- PostgreSQL (a database and connection details)

## Quick start
1. Install dependencies

```bash
npm install
```

2. Create the Postgres table and seed seats (example SQL):

```sql
CREATE TABLE seats (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	isbooked INT DEFAULT 0
);
-- Insert 20 empty seats
INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20);
```

3. Adjust DB connection in `index.mjs` if necessary (host/port/user/password/database). The default connection in the code uses:

- host: `localhost`
- port: `5433`
- user: `postgres`
- password: `postgres`
- database: `sql_class_2_db`

4. Start the server

```bash
npm start
```

The app listens on port `8080` by default (or `process.env.PORT`). Open http://localhost:8080 to use the UI.

## API
- `GET /seats` — returns all seats as JSON
- `PUT /:id/:name` — attempts to book seat `id` for `name`. Returns error if already booked.

## Notes
- Booking is done inside a DB transaction with `SELECT ... FOR UPDATE` to avoid race conditions.
- This demo does not include authentication or payment; it's intended for learning/concepts.

## Files
- `index.mjs` — server and DB logic
- `index.html` — frontend UI

## License
Use or modify freely for learning and demos.
# Book-my-ticket
