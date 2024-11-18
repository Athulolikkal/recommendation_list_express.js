import { executeQuery, sql } from "../config.js";

//find collection with same name and userId
export const getFavouriteByUserIdAndName = async (userId, name) => {
    const query = async () => await sql`SELECT * FROM public.favourites WHERE user_id = ${userId} AND name = ${name}`;
    const isItem = await executeQuery(query)
    // checking user
    if (Array.isArray(isItem)) {
        return { status: true, favourite: isItem }
    }
    //else retruning error as true
    return { error: true }
};

//create favourite
export const addFavourite = async (user_id, name, description) => {
    const insertQuery = async () => {
        const result = await sql`
            INSERT INTO public.favourites (user_id, name, description)
            VALUES (${user_id}, ${name}, ${description})
            RETURNING id;`;
        return result;
    };
    const response = await executeQuery(insertQuery);
    if (response && Array.isArray(response) && response[0]?.id) {
        return { status: true, insertedId: response[0]?.id }
    }
    return { error: true }
};

//update existing favourite

//remove favourite