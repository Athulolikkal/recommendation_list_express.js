import express, { urlencoded, Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes/index.js'
import { connectToDb } from './db/config.js';

const app = express();
const router = Router();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '30mb' }));
app.use(urlencoded({ limit: '100mb', extended: true }))

routes(app, router)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`port listening on port:${PORT}`);
});

connectToDb();
