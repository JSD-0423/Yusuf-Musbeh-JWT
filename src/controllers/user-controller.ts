import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../db/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Book } from "../db/models/book";

dotenv.config();
async function postSignup(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { userName, password, email } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    user_name: userName,
    email: email,
    password: hashedPassword,
  });
  await user.save();
  response.status(200).json({
    statusCode: 200,
    message: "singed up successfully ",
    user: { email: user.email, userName: user.user_name },
  });
}

async function postLogin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email, password } = request.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user || !bcrypt.compareSync(password, user.password ?? ""))
    return response
      .status(400)
      .json({ statusCode: 400, message: "email or password is wrong" });

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.SECRET_KEY ?? "");
  response.status(200).json({
    statusCode: 200,
    message: "logged up successfully ",
    user: { email: user.email, name: user.user_name, token: token },
  });
}

async function getRent(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const user = request.user as User;
  const rentedBooks = await user.$get("books", {
    attributes: ["id", "name", "author"],
  });
  response.status(200).json({ statusCode: 200, books: rentedBooks });
}

async function postRent(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // const { bookId } = request.params;
    // if (!bookId)
    //   return response
    //     .status(400)
    //     .json({ statusCode: 400, message: "bookId is required" });
    // const book = await Book.findByPk(bookId);
    // if (!book)
    //   return response
    //     .status(400)
    //     .json({ statusCode: 400, message: "there is no book with this id" });
    //
    // const user = request.user as User;
    //
    // const isRented = await user?.$has("book", book);
    // if (isRented)
    //   return response
    //     .status(400)
    //     .json({ statusCode: 400, message: "this book is already rented" });
    // const rentedBook = await user.addBook(book);
    const id = request.params.bookId;
    const user = request.user as User;
    const book = await Book.findByPk(id);
    const rentedBook = await user?.$add("book", book!);
    response.status(200).json({
      statusCode: 200,
      message: "rent book successfully",
      data: rentedBook,
    });
  } catch (e) {
    console.log(e);
    response
      .status(500)
      .json({ statusCode: 500, message: "Something went wrong" });
  }
}
export { postSignup, postLogin, postRent, getRent };
