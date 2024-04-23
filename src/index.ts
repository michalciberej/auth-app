import express from 'express';
import cors from 'cors';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';
import { User } from './models/user';
import asyncHandler from 'express-async-handler';

require('dotenv').config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.set('views', 'src/views');
app.set('view engine', 'pug');

// app.use(
//   session({
//     secret: process.env.SECRET!,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post(
  '/register',
  asyncHandler(async (req, res) => {
    // ! CHANGE FOR RETURN VALUE FROM HASH FUNCTION
    const hashedPassword = '$';
    const salt = '#';

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      hashedPassword,
      salt,
    });

    try {
      await newUser.save();
      res.redirect('/login');
    } catch (err) {
      res.send('ERROR');
    }
  })
);

app.get('/login', (req, res) => {
  res.render('login');
});

app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/register',
    successRedirect: '/authPath',
  })
);

app.get('/authPath', (req, res) => {
  res.render('authPath');
});

app.listen(3000, () => console.log('Server is running on port 3000'));
