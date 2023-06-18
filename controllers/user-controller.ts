import { NextFunction, Request, Response } from "express";
import { User } from "../db/models/user";
import bcrypt from "bcrypt";
async function postSignup(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { name, password } = request.body;
  console.log(name, " === ", password);
  if (!(name && password)) {
    return response
      .status(400)
      .json({ statusCode: 400, message: "name and password are required" });
  }
  const isExist = !!(await User.findOne({ where: { name: name } }));
  if (isExist)
    return response
      .status(400)
      .json({ statusCode: 400, message: "user already exists with this name" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name: name, password: hashedPassword });
  await user.save();
  response
    .status(200)
    .json({
      statusCode: 200,
      message: "singed up successfully ",
      user: { name: user.name },
    });
}

export { postSignup };
