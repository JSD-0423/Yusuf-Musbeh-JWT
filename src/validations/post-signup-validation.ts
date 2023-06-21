import { Schema } from "express-validator";
import { User } from "../db/models/user";

export const postSignupValidation: Schema = {
  userName: {
    in: "body",
    notEmpty: {
      errorMessage: "userName is required",
    },
    isLength: {
      options: { min: 3, max: 15 },
      errorMessage: "Username length should be between 8 to 15",
    },
  },

  password: {
    in: "body",
    notEmpty: {
      errorMessage: "password in required",
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: "Password should be at least 8 chars",
    },
  },
  email: {
    in: "body",
    notEmpty: {
      errorMessage: "email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "Enter a valid Email",
      bail: true,
    },
    custom: {
      options: async (email) => {
        const isExist = !!(await User.findOne({ where: { email: email } }));
        console.log(isExist);
        if (isExist) {
          throw new Error("There is an account exist with email");
        }
        return true;
      },
      errorMessage: "There is an account exist with this email",
    },
  },
};
