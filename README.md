# Concert Preview App

A full-stack concert preview web application featuring a React frontend and a Flask backend.

## Features

- Browse upcoming concerts with images, dates, and ticket links
- Interactive seat maps for venue seating
- User authentication system with signup and login
- Secure password hashing with Flask-Bcrypt
- Persistent user sessions
- REST API backend with Flask and SQLite database

## Technologies Used

- **Frontend:** React, CSS
- **Backend:** Flask, Flask-Bcrypt, Flask-CORS, SQLAlchemy, SQLite
- **APIs:** Ticketmaster API for event data

## Backend Overview

The Flask backend provides RESTful API endpoints for user authentication and manages user data with a SQLite database:

- `/signup` (POST): Register a new user with email and password (passwords are hashed securely).
- `/login` (POST): Authenticate existing users.
- Utilizes `Flask-Bcrypt` for password hashing.
- Uses `Flask-CORS` to enable cross-origin requests from the frontend.
- Manages sessions for user login persistence.
- Database models defined using SQLAlchemy ORM.

## Status

🚧 This project is currently a **work in progress**. New features, bug fixes, and improvements are actively being developed.

## Getting Started

