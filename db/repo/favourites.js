import { executeQuery, sql } from "../config.js";

//find collection with same name and userId
export const getFavouriteByUserIdAndName = async (userId, name) => {
    const query = async () => await sql`SELECT * FROM public.favourites WHERE user_id = ${userId} AND name = ${name}`;
    const isItem = await executeQuery(query)
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
export const addRecommendationToFav = async (recomId, favId) => {
    const query = async () => {
        const result = await sql`
            UPDATE public.favourites
            SET recommendation_ids = ARRAY(
                SELECT DISTINCT UNNEST(recommendation_ids) UNION SELECT ${recomId}
            ),
            updated_at = NOW()
            WHERE id = ${favId}
            RETURNING recommendation_ids;
        `;
        return result;
    };
    const response = await executeQuery(query);
    if (response && Array.isArray(response) && response[0]?.recommendation_ids) {
        return { status: true, updatedIds: response[0]?.recommendation_ids };
    }
    return { error: true, message: 'Failed to update recommendation IDs' };
};


//remove favourite
export const removeFavouriteById = async (id) => {
    const deleteQuery = async () => {
        const result = await sql`
            DELETE FROM public.favourites
            WHERE id = ${id}
            RETURNING id;`;
        return result;
    };

    const response = await executeQuery(deleteQuery);
    if (response && Array.isArray(response) && response[0]?.id) {
        return { status: true, message: 'Item deleted successfully', deletedItem: response[0]?.id };
    }
    return { status: false, message: 'Item not found or unable to delete' };
};

//fetching collection details by Id
export const getFavouriteById = async (favId) => {
    const query = async () => await sql`SELECT * FROM favourites WHERE id = ${favId}`;
    const isItem = await executeQuery(query)
    if (isItem && Array.isArray(isItem) && isItem.length > 0) {
        return { status: true, favDetails: isItem[0] }
    }
    return { error: true, status: false }
}