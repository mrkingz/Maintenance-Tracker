import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routers from './routes';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(routers.authRoutes);

app.all('/api', (req, res) => {
  res.status('200').send('Connection ok');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

export default app;