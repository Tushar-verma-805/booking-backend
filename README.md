# Urban Booking Backend

This project is the backend server for the Urban Booking App. It provides REST APIs for managing users, carpenters, bookings, and time slots.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all dependencies needed for the server to run.

### `npm start`

Starts the server in development mode.\
Server will run on [http://localhost:5000](http://localhost:5000).

Make sure your database is running and configured in `.env`.

### `npx sequelize-cli db:migrate`

Applies all pending database migrations to create tables.

### `npx sequelize-cli db:seed:all`

Seeds the database with sample data.\
This includes 5 carpenter entries to test the booking functionality.

---

## Environment Variables

Create a `.env` file in the root with the following:

