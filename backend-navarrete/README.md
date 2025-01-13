# Navarrete Beef Jerky Backend API

This project is a backend API for managing users, products, orders, order items, bulk orders, and audit logs. The API is built using Node.js, Express, Prisma, and PostgreSQL, with Swagger documentation for the endpoints.

## Prerequisites

Before starting, ensure that you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [PostgreSQL](https://www.postgresql.org/) (v12 or later)
- [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli) (installed globally or locally in the project)
- A package manager ([npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/))

---

## Environment Setup

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/HorizonsDevs/navarrete-project.git
    cd backend-navarrete
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Configure Environment Variables:**

    Create a `.env` file in the root directory of the project. Add the following variables and replace placeholders with your PostgreSQL configuration:

    ```env
    DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database_name>"
    PORT=3000
    ```

    **Example:**

    ```env
    DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/navarrete_database"
    PORT=3000
    ```

4. **Setup PostgreSQL Database:**

    - Ensure PostgreSQL is running on your system.
    - Create a new database (e.g., `navarrete_database`).
    - Use a PostgreSQL client like pgAdmin or psql to verify the database connection.

5. **Initialize Prisma:**

    - Generate the Prisma Client:

      ```bash
      npx prisma generate
      ```

    - Apply the database migrations:

      ```bash
      npx prisma migrate dev --name init
      ```

6. **Verify Prisma Models:**

    Open `prisma/schema.prisma` to verify the models (e.g., `users`, `orders`, `products`, etc.). Ensure the models align with your database structure.

---

## Running the Server

1. **Start the Development Server:**

    ```bash
    npm start
    ```

2. **Swagger Documentation:**

    The Swagger UI is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

3. **Test Endpoints:**

    Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the API endpoints.

---


---

## Deployment

1. **Prepare for Production:**

    - Update `.env` for production PostgreSQL settings.
    - Build and optimize the application if necessary.

2. **Run the Production Server:**

   - Run the command 'node index.js'
