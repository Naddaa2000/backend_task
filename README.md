# NestJS User Data CRUD Operations

This NestJS application provides create,filter,sorting and pagination operations for user data using MySQL as the database with following fields:

- Id (integer)
- Name (string)
- Age (integer)
- Email (string)
- DateofBirth (date)

## Features and url to test in postman(you can use combinations to get records)

- Create a user record: Post [http://localhost:3000/api/user]
- filter records based on Name, Age, Email, Id, DateofBirth: Post [http://localhost:3000/api/user/find?Name=enter_any_name]
- Sort user records based on Name, Age, Email, Id, DateofBirth in ascending and descending order:
  - Post [[http://localhost:3000/api/user/find?sortField=DateofBirth&sortOrder=DESC]]
  - Post [[http://localhost:3000/api/user/find?sortField=DateofBirth&sortOrder=ASC]]
- Set the page size and retrieve a specific page of data:
  - Post [[http://localhost:3000/api/user/find?page=1&pageSize=10]]
- an example of multi query [[http://localhost:3000/api/user/find?page=1&pageSize=10&sortField=Name&sortOrder=DESC]]

## Filtration types

- Id (exact match only number allowed)
- Name (case-insensitive partial match only string allowed)
- Age (exact match only number allowed)
- Email (case-insensitive partial match)
- Date of Birth (From-To)
- DateofBirth (Exact YYY-MM-DD format)

## Prerequisites

Ensure you have the following software installed:

- Visual Studio Code
- MySQL with a database created for using
- DBeaver (optional) for database visualization
  -postman to test the api

## Installation

1. Create a `.env` file in the root directory and specify your MySQL connection variables and localhost port:

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=your_db_port
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database_name
DB_SYNCHRONIZE=true
PORT=port_on_which_you_want_to_run_your_server
```

2. run the following command to install the dependencies

```Bash
$ npm install
```

3. run the following command to Generate a sample dataset containing 100 records

```Bash
$ npm run seed
```

4. run the following command to regenerate records

```Bash
$ npm run seed:refresh
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
