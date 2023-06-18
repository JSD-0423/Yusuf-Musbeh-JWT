import { User } from "./models/user";
import { Book } from "./models/book";
import { sequelize } from "./connection";

export async function dbInit() {
  Book.belongsToMany(User, { through: "rented_books", timestamps: false });
  await sequelize.sync();
}
