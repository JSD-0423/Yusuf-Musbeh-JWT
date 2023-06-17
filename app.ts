import express, { Express } from "express";
import { authenticateConnection } from "./db/connection";
import { dbInit } from "./db/db-init";

const app: Express = express();

authenticateConnection().then(() => {
  dbInit().then(() => {
    app.listen(3000, "localhost", () =>
      console.log("server is running on port 3000")
    );
  });
});
