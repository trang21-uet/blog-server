import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import router from './api/routes';
import db from './db';

db.initialize()
  .then(() => {
    console.log('Connect to database successfully!');
    const app = express();

    app.use(morgan('dev'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(cors());

    app.use('/api', router);

    app.use((_req, res, _next) => {
      const error = new Error('Not found');
      return res.status(404).json({
        message: error.message,
      });
    });

    const httpServer = http.createServer(app);
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () =>
      console.log(`The server is running at http://localhost:${PORT}`)
    );
  })
  .catch(e => console.error('Connect to database failed: ', e));
