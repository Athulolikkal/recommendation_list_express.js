import dotenv from 'dotenv';
dotenv.config();

import express, { urlencoded, Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes/index.js'

const app = express();
const router = Router();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '30mb' }));
app.use(urlencoded({ limit: '100mb', extended: true }))

routes(app, router)
// app.get('/', async (_, res) => {
//   const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//   });
//   const client = await pool.connect();
//   const result = await client.query('SELECT version()');
//   client.release();
//   const { version } = result.rows[0];
//   console.log(version);
//   res.json({ version });
// });
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`port listening on port:${PORT}`);
});
