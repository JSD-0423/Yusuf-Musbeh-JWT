import { NextFunction, Request, Response } from "express";
import { User } from "../db/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { serializeUser } from "passport";
import { RentedBook } from "../db/models/rented-books";
import { Book } from "../db/models/book";
dotenv.config();
async function postSignup(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { name, password } = request.body;
  console.log(name, " === ", password);
  if (!(name && password))
    return response
      .status(400)
      .json({ statusCode: 400, message: "name and password are required" });

  const isExist = !!(await User.findOne({ where: { name: name } }));
  if (isExist)
    return response
      .status(400)
      .json({ statusCode: 400, message: "user already exists with this name" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name: name, password: hashedPassword });
  await user.save();
  response.status(200).json({
    statusCode: 200,
    message: "singed up successfully ",
    user: { name: user.userName },
  });
}

async function postLogin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { name, password } = request.body;
  if (!(name && password))
    return response
      .status(400)
      .json({ statusCode: 400, message: "name and password are required" });

  const user = await User.findOne({ where: { name: name } });

  if (!user || !bcrypt.compareSync(password, user.password ?? ""))
    return response
      .status(400)
      .json({ statusCode: 400, message: "name or password wrong" });

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.SECRET_KEY ?? "");
  response.status(200).json({
    statusCode: 200,
    message: "logged up successfully ",
    user: { name: user.userName, token: token },
  });
}

async function postRent(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { bookId } = request.body;
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
  const rentedBook = new RentedBook({ bookId: bookId, userId: user.id });
  await rentedBook.save();
  response
    .status(200)
    .json({ statusCode: 200, message: "rent book successfully" });
}
export { postSignup, postLogin, postRent };