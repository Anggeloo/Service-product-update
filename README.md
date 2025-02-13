# Service Product Update

## Description
This microservice allows updating products in the system using a REST API. It is built with Node.js and Express, utilizing PostgreSQL as the database.

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Environment Variables
Create a `.env` file in the root directory and configure the required variables.

## Installation
1. Install dependencies:
   ```sh
   npm install
   ```

2. Run the service in development mode:
   ```sh
   npm run dev
   ```
   or manually using:
   ```sh
   nodemon app.js
   ```

3. Run the service in production mode:
   ```sh
   node app.js
   ```

## Running with Docker
1. Build the Docker image:
   ```sh
   docker build -t service-product-update .
   ```

2. Run the container:
   ```sh
   docker run -p 3002:3000 --env-file .env service-product-update
   ```

3. Alternatively, use Docker Compose:
   ```sh
   docker-compose up --build
   ```

## API Documentation
This service provides API documentation via Swagger. Once the service is running, access it at:
```
http://localhost:5050/api-docs
```

## Database Setup
Ensure you have a PostgreSQL database running. If using Docker, you can spin up a PostgreSQL container with:
```sh
docker run --name postgres-db -e POSTGRES_USER=your_database_user -e POSTGRES_PASSWORD=your_database_password -e POSTGRES_DB=your_database_name -p 5432:5432 -d postgres
```

## Testing
Currently, no test scripts are defined. You may add tests and run them using:
```sh
npm test
```
## Authors
Cadena Anggelo and Caiza Katherine
