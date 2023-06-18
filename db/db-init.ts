import { User } from "./models/user";
import { Book } from "./models/book";
import { sequelize } from "./connection";
import { RentedBook } from "./models/rented-books";

export async function dbInit() {
  Book.belongsToMany(User, { through: RentedBook, timestamps: false });
  User.belongsToMany(Book, { through: RentedBook, timestamps: false });
  await sequelize.sync({ alter: true });
}
