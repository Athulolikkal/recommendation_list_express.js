import dotenv from 'dotenv'; dotenv.config();
import { neon } from '@neondatabase/serverless'
export const sql = neon(`${process.env.DATABASE_URL}`);

//checking the db connection on server running
export const connectToDb = async () => {
    try {
        console.log('Setting up the database...');
        const response = await sql`SELECT version()`;
        const { version } = response[0];
        //creating favourites table
        await sql`
        CREATE TABLE IF NOT EXISTS public.favourites (
            id BIGSERIAL PRIMARY KEY,
            user_id BIGINT NOT NULL,
            recommendation_ids BIGINT[] DEFAULT '{}',
            name VARCHAR(255) NOT NULL,
            description TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(), 
            CONSTRAINT favourites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
        )
    `;
        console.log('Data base connection successfull', version);
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw err;
    }
}

//for executing all the querys
export const executeQuery = async (query) => {
    try {
      const result = await query();
      return result;
    } catch (error) {
      console.error('Database query error:', error);
      return {error:ture,message:'something went wrong'}
    }
  };