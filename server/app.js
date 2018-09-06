import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookiePasrer from 'cookie-parser';
import routers from './routes';
import UserController from './controllers/userController';

dotenv.config();
const app = express();

app.use(logger('dev'));


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(cookiePasrer());
app.use(routers.authRoutes);
app.use(routers.requestRouter);

app.all('/api', (req, res) => {
  res.status('200').send({
    status: 'success',
    message: 'Connection ok'
  });
});

app.all('*', (req, res) => {
  res.status('400').json({
    status: 'fail',
    message: 'Sorry, there is nothing here!'
  });
});

try {
  UserController.createAdmin();
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
} catch (err) {
  console.log(`Something went wrong! Could not create admin: ${err}`);
}

export default app;