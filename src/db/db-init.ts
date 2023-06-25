import { User } from "./models/user";
import { Book } from "./models/book";
import { sequelize } from "./connection";

export async function dbInit() {
  // User.hasMany(RentedBook, { sourceKey: "id" });
  // RentedBook.belongsTo(User, { targetKey: "id" });
  // Book.hasMany(RentedBook, { sourceKey: "id" });
  // RentedBook.belongsTo(Book, { targetKey: "id" });
  // Book.belongsToMany(User, { through: RentedBook, timestamps: false });
  Book.belongsToMany(User, {
    through: "rented_books",
    foreignKeyConstraint: true,
    foreignKey: "book_id",
    timestamps: false,
  });
  User.belongsToMany(Book, {
    through: "rented_books",
    foreignKeyConstraint: true,
    foreignKey: "user_id",
    timestamps: false,
  });
  await sequelize.sync({ alter: true });
}
