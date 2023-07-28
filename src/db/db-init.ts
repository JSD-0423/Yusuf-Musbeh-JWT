import { sequelize } from "./connection";

export async function dbInit() {
  await sequelize.sync({ alter: true });
}
