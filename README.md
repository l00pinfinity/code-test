# CRESWAVE CODE TEST

Welcome to the Creswave Code Test project! This project is a simple Angular application generated with Angular CLI version 17.3.6.

## Development server

To run the development server, you'll need to set up a backend server using JSON-Server to mock data.

First, install JSON-Server globally:

```sh
npm install -g json-server
```

Then, start the JSON-Server with the provided `db.json` file:

```
npx json-server db.json
```

This will start the JSON-Server backend server.

Next, start the Angular development server:

```sh
ng serve
```

Navigate to `http://localhost:4200/` in your browser to view the application. The application will automatically reload if you make any changes to the source files.

Please note that when using JSON-Server, you may need to restart the server after adding tasks to update the server with the new data.