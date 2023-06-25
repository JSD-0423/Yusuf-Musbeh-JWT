import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user";
import { Book } from "./models/book";
import { RentedBook } from "./models/rented-books";
const dbConfig = require("../../config/config.json")["development"];
const sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  dialect: dbConfig.dialect,
  host: dbConfig.host,
  models: [User, Book, RentedBook],
});

async function authenticateConnection() {
  await sequelize.authenticate();
  console.log("Connection has been established successfully ");
}

export { sequelize, authenticateConnection };
