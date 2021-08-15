import express from 'express';
import cookieParser from 'cookie-parser';

import userRoute from './routes/user';
import db from './data/db';

const morgan = require('morgan');
const app = express();

/* -------------------------------------------- */
/*                  Middlewares                 */
/* -------------------------------------------- */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/* -------------------------------------------- */
/*                    Routes                    */
/* -------------------------------------------- */
app.use('/api', userRoute);

db.on('connected', () => {
  const port = process.env.PORT;
  const host = process.env.HOST;
  app.listen(port, () => console.log(`Api is running on http://${host}:${port}`));
});
