import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import db from './data/db';
import { requiresSignin } from './controllers/auth';
import jwtErrorHandler from './helpers/jwtErrorHandler';

import authRoute from './routes/auth';
import userRoute from './routes/user';

const app = express();
// TODO : add config module to store all public urls
// const publicUrls = ['/signup', '/signin', '/signout'].map(url => '/api' + url);

/* -------------------------------------------- */
/*                  Middlewares                 */
/* -------------------------------------------- */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(requiresSignin.unless({ path: publicUrls }));
// app.use(jwtErrorHandler);

/* -------------------------------------------- */
/*                    Routes                    */
/* -------------------------------------------- */
app.use('/api', authRoute);
app.use('/api', userRoute);

app.get('/api/hello', (req, res) => res.json({ message: 'hello' }));

db.on('connected', () => {
  const port = process.env.PORT;
  const host = process.env.HOST;
  app.listen(port, () => console.log(`Api is running on http://${host}:${port}`));
});
