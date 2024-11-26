import * as Express from 'express';
import { LogMiddleware } from './middleware/log.middleware';
const app = Express();

app.use(LogMiddleware.init);

app.route('/').get((req, res) => {
  res.status(200).send('Hello World!');
});

export default app;
