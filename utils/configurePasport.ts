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
        secretOrKey: "secret",
      },
      async (jwt_payload: string, cb: any) => {
        console.log("here");
        const user = await User.findByPk(jwt_payload);
        if (!user) return cb(null, false);
        cb(null, user);
      }
    )
  );
}

export { configurePassport };
