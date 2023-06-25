import { Schema } from "express-validator";
import { User } from "../db/models/user";
import { Book } from "../db/models/book";

const postRentValidation: Schema = {
  bookId: {
    in: "params",
    custom: {
      options: async (bookId, { req }) => {
        if (!bookId) throw new Error("Book id is required");
        const book: Book | null = await Book.findByPk(bookId);
        if (!book) throw new Error("There is no book with this ID");
        const user: User = req.user as User;
        const isRented = await user.$has("Book", book);
        if (isRented) throw new Error("This book is already rented");
        req["book"] = book;
        return true;
      },
    },
  },
};

export { postRentValidation };
