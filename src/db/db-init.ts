import { User } from "./models/user";
import { Book } from "./models/book";
import { sequelize } from "./connection";
import { RentedBook } from "./models/rented-books";

export async function dbInit() {
  User.hasMany(RentedBook);
  RentedBook.belongsTo(User);

  Book.hasMany(RentedBook);
  RentedBook.belongsTo(Book);
  Book.belongsToMany(User, { through: RentedBook, timestamps: false });

  await sequelize.sync({ alter: true });
}
