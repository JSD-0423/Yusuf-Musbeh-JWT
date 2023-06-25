import { Schema } from "express-validator";
import { User } from "../db/models/user";

export const postLoginValidation: Schema = {
  password: {
    in: "body",
    notEmpty: {
      errorMessage: "Password is required",
      bail: true,
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: "Password should be at least 8 chars ",
      bail: true,
    },
  },
  email: {
    in: "body",
    notEmpty: {
      errorMessage: "Email required",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email invalid",
      bail: true,
    },
    custom: {
      options: async (email) => {
        console.log(User);
        const isExist = !!(await User.findOne({ where: { email: email } }));
        const user = await User.findOne({ where: { email: email } });

        if (!isExist) {
          throw new Error("Email or password is wrong");
        }
        return true;
      },
    },
  },
};
