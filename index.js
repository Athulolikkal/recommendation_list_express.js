import express, { urlencoded, Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
//project route folder
import routes from './routes/index.js'
//Db connection function
import { connectToDb } from './db/config.js';

const app = express();
const router = Router();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '30mb' }));
app.use(urlencoded({ limit: '100mb', extended: true }))

//loading project route and passing app and router instance
routes(app, router)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`port listening on port:${PORT}`);
});

//establishing an connection to Db when the server starts
connectToDb();
