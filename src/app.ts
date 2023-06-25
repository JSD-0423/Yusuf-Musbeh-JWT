import express, { Express } from "express";
import { authenticateConnection } from "./db/connection";
import { dbInit } from "./db/db-init";
import { configurePassport } from "./utils/configure-passport";
import passport from "passport";
import { publicRouter as publicUserRouter } from "./routes/user-route";
import { User } from "./db/models/user";

const app: Express = express();
app.use(express.json());
app.use(passport.initialize());
configurePassport();
app.use(publicUserRouter);
authenticateConnection().then(() => {
  dbInit().then(() => {
    app.listen(3000, "localhost", () =>
      console.log("server is running on port 3000")
    );
  });
});
