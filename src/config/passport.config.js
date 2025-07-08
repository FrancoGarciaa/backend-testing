import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { config } from "./env.config.js";
import UserModel from "../persistence/models/user.model.js";

export const initializePassport = () => {
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt_secret,
};

passport.use("jwt", new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
    const user = await UserModel.findById(jwt_payload.user._id);
    if (!user) return done(null, false);
    return done(null, user);
    } catch (error) {
    return done(error, false);
    }
}));
};

export default passport;
