import passport from 'passport';
import { User, UserType } from '../models/user';
const LocalStrategy = require('passport-local').Strategy; // ?!
import { validatePassword } from '../lib/password';

const verify = async (username: string, password: string, done: any) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false);

    const isCorrectPassword = await validatePassword(
      password,
      user.hashedPassword
    );

    if (isCorrectPassword) return done(null, user);
    else return done(null, false);
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(verify);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (userx: UserType, done) => {
  const { username } = userx;
  try {
    const user = await User.findOne({ username });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
