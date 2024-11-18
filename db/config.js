import dotenv from 'dotenv'; dotenv.config();
import { neon } from '@neondatabase/serverless'

const sql = neon(`${process.env.DATABASE_URL}`);

export const connectToDb = async () => {
    try {
        const response = await sql`SELECT version()`;
        const { version } = response[0];
        console.log('Database connected----Database Version:', version);
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw err;
    }
}