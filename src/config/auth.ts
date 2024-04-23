import passport from 'passport';
import { User } from '../models/user';
const LocalStrategy = require('passport-local').Strategy; // ?!
import { validatePassword } from '../lib/password';

const verify = async (username: string, password: string, done: any) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false);

    const isCorrectPassword = validatePassword(
      password,
      user.hashedPassword,
      user.salt
    );

    if (isCorrectPassword) return done(null, user);
    else return done(null, false);
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(verify);

passport.use(strategy);

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById({ id: userId });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
