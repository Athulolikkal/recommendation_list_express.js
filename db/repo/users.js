import { executeQuery, sql } from "../config.js";

//finding user by Id
export const getUserById = async (userId) => {
    const query = async () => await sql`SELECT * FROM users WHERE id = ${userId}`;
    const isUser = await executeQuery(query)
    // checking user
    if (isUser && Array.isArray(isUser) && isUser.length === 1) {
        return { status: true, userDetails: isUser[0] }
    }
    //else retruning error as true
    return { error: true, status: false }
};