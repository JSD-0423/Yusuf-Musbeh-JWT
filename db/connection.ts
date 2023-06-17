import { Sequelize } from "sequelize";

const sequelize = new Sequelize("book-shop", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

async function authenticateConnection() {
  await sequelize.authenticate();
  console.log("Connection has been established successfully ");
}

export { sequelize, authenticateConnection };
