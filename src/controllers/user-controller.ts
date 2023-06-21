import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../db/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RentedBook } from "../db/models/rented-books";
import { Book } from "../db/models/book";
dotenv.config();
async function postSignup(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { userName, password, email } = request.body;
  if (!(userName && password && email))
    return response.status(400).json({
      statusCode: 400,
      message: "username and email ,password are required",
    });

  const isExist = !!(await User.findOne({ where: { email: email } }));
  if (isExist)
    return response.status(400).json({
      statusCode: 400,
      message: "user already exists with this email",
    });
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
  if (!(email && password))
    return response
      .status(400)
      .json({ statusCode: 400, message: "name and password are required" });

  const user = await User.findOne({ where: { email: email } });

  if (!user || !bcrypt.compareSync(password, user.password ?? ""))
    return response
      .status(400)
      .json({ statusCode: 400, message: "email or password wrong" });

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
  const userId = request.user.id;
  const rentedBooks = await RentedBook.findAll({
    where: { userId: userId },
    include: [Book],
  });
  response.status(200).json({ statusCode: 200, books: rentedBooks });
}

async function postRent(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { bookId } = request.params;
  if (!bookId)
    return response
      .status(400)
      .json({ statusCode: 400, message: "bookId is required" });
  const user: User = request.user;
  const book = await Book.findByPk(bookId);
  if (!book)
    return response
      .status(400)
      .json({ statusCode: 400, message: "there is no book with this id" });
  const isRented = !!(await RentedBook.findOne({
    where: {
      [Op.and]: {
        userId: user.id,
        bookId: bookId,
      },
    },
  }));
  if (isRented)
    return response
      .status(400)
      .json({ statusCode: 400, message: "this book is already rented" });
  const rentedBook = new RentedBook({ bookId: bookId, userId: user.id });
  await rentedBook.save();
  response
    .status(200)
    .json({ statusCode: 200, message: "rent book successfully" });
}
export { postSignup, postLogin, postRent, getRent };
