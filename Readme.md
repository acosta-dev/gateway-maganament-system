Gateway System Management

This project consists of two apps, Server and Client, the server provides the backend (API) created with NodeJS, Express, and MongoDB as Database Engine. The Client provides a basic UI for CRUD operations, it was created with ReactJS and Tailwind. Instructions to execute both apps are detailed below.

Requirements:

- NodeJS \>= 14.20.0 LTS.
- NPM \>= 6.14.17.
- A MongoDB server (Can be locally installed, or in the cloud, for example Mongo Atlas).

Server:

1. Open a terminal and go to the server directory.
2. Execute "npm install" to install all dependencies.
3. Create a .env file and inside server root and declare the Mongo DB URI (DATABASE\_URL), if this file it's not present default will be to localhost (mongodb://localhost/gateway-maganament), on this same file declare another Mongo DB URI to the test database (DATABASE\_URL\_TEST), this database will be used to run tests without affecting the "production" or "development" database. On this file can also be specified the port on which the server will listen for connections, if not present port 5000 will be used.

4. Execute on the terminal "npm run start" to run the application on a production environment, "npm run dev" for development environment and "npm run test" to execute the tests.

Client:

1. Open a terminal and go to the client directory.
2. Execute "npm install" to install all dependencies.
3. Inside the client app on the route src->-api->gateway.js and peripherals.js can be found on line #2 the api base url endpoint, it must be changed if needed.
4. Execute "npm start" in the terminal to run the application.
