# Express.js Project with Prisma ORM

This project demonstrates a simple backend built using **Express.js** and **Prisma ORM** for interacting with a database. It includes basic **authentication** (Register & Login) and **authorization** (role-based access control), along with **CRUD operations** for managing posts and users.

## Features

- **Authentication & Authorization**:
  - Register new users with a role (admin or user).
  - Login and receive a JWT token.
  - Admin can view all users.
  
- **CRUD Operations for Posts**:
  - View all posts.
  - View a single post by its ID.
  - Create new posts (authentication required).
  - Update posts (authentication required).
  - Delete posts (authentication required).

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Endpoints](#api-endpoints)
4. [Project Structure](#project-structure)
5. [Contributing](#contributing)
6. [License](#license)
7. [Acknowledgments](#acknowledgments)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A running instance of a database (e.g., PostgreSQL, MySQL, SQLite)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/lebefriedlich/belajar-expressjs-prisma.git
   cd belajar-expressjs-prisma
   ```
   
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Prisma schema and database connection:

   - Edit the `prisma/schema.prisma` file to configure your database connection (for example, SQLite, PostgreSQL, or MySQL).
   - Run Prisma migrations to set up the database schema:

     ```bash
     npx prisma migrate dev
     ```

4. Create a `.env` file to store environment variables. Example `.env` file:

   ```env
   DATABASE_URL="your_database_connection_string"
   JWT_SECRET="your_jwt_secret_key"
   ```

5. Run the application:

   ```bash
   npm start
   ```
   Your application will be available at http://localhost:3000.
   
## Usage

### API Endpoints

#### Authentication

- **POST** `/register` - Register a new user (requires `email`, `password`, and `role` as input).
- **POST** `/login` - Login with existing credentials (requires `email` and `password`).

#### User Management (Admin Only)

- **GET** `/users` - Get a list of all users (only accessible by admin, authentication required).

#### Post CRUD Operations

- **GET** `/posts` - Get all posts.
- **GET** `/posts/:id` - Get a specific post by ID.
- **POST** `/posts` - Create a new post (authentication required).
- **PUT** `/posts/:id` - Update a post by ID (authentication required).
- **DELETE** `/posts/:id` - Delete a post by ID (authentication required).

### Protecting Routes

Certain routes require authentication using JWT tokens. The **AuthMiddleware** protects these routes by checking if the request contains a valid token. Additionally, certain routes (like viewing all users) are protected by **role-based authorization** (e.g., only admin users can access them).

### Middleware

- **AuthMiddleware**: This middleware protects routes by verifying the JWT token.
- **RoleMiddleware**: This middleware restricts access to certain routes based on user roles (e.g., `ADMIN` role required).

## Acknowledgments

- **Prisma ORM**: For providing an easy-to-use ORM for interacting with databases.

- **JWT**: For the authentication mechanism.

- **Express.js**: For being a lightweight framework for building APIs.

- **Node.js**: For being the JavaScript runtime environment.

