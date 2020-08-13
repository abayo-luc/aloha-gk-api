import dotenv from "dotenv";
import { Strategy, ExtractJwt } from "passport-jwt";
const User = require("../models").User;

dotenv.config();
const { JWT_SECRET_KEY } = process.env;
const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = JWT_SECRET_KEY;

export default new Strategy(options, async (payload, done) => {
  const { id } = payload;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return done("User is not authenticated", false);
    }
    user.password = undefined;
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});
