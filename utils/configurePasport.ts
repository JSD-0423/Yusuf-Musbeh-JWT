import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";
import { User } from "../db/models/user";
dotenv.config();
function configurePassport() {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY,
      },
      async (jwt_payload, cb: any) => {
        const userObject: User | null = await User.findByPk(jwt_payload.id);
        if (!userObject) return cb(null, false);
        cb(null, userObject);
      }
    )
  );
}

export { configurePassport };
