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
      async (jwt_payload: any, done: any) => {
        const userObject: User | null = await User.findByPk(jwt_payload.id);
        if (!userObject) return done("invalid token", false);
        return done(null, userObject);
      }
    )
  );
}

export { configurePassport };
