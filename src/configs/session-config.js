import session from 'express-session';
import MongoStore from 'connect-mongo';

const sessionConfig = session({
  secret: "mysecretkey",
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
    sameSite: false,
    secure: false,
  },
  store: new MongoStore({ mongoUrl: process.env.MONGO_URI }),
});

export default sessionConfig
