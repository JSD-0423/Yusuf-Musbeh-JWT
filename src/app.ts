import express, { Express } from "express";
import { authenticateConnection } from "./db/connection";
import { dbInit } from "./db/db-init";
import { configurePassport } from "./utils/configure-passport";
import passport from "passport";
import { router as userRouter } from "./routes/user-route";

const app: Express = express();
app.use(express.json());
app.use(passport.initialize());
configurePassport();
app.use(userRouter);
authenticateConnection().then(() => {
  dbInit().then(() => {
    app.listen(3000, "localhost", () =>
      console.log("server is running on port 3000")
    );
  });
});
