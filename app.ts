import express, { Express } from "express";

const app: Express = express();

app.listen(3000, "localhost", () =>
  console.log("server is running on port 3000")
);
