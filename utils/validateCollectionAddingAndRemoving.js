import favouritesController from "../controllers/favouritesController/index.js";
import { getFavouriteById } from "../db/repo/favourites.js";
import { getRecommendationDetailsById } from "../db/repo/recommendation.js";
import { getUserById } from "../db/repo/users.js";

export const validateCollectionProcess = async (userId, favId, recommendationId) => {
    try {
        const isUser = await getUserById(userId);
        const isFav = await getFavouriteById(favId);
        const isRecom = await getRecommendationDetailsById(recommendationId)
        // any item is not valid then
        if (!isUser?.status || !isFav?.status || !isRecom?.status) {
            return { status: false, code: 404, message: 'Invalid IDs' };
        }
        //check collection and recommendation is created by the same user
        if (parseInt(userId) !== parseInt(isFav?.favDetails?.user_id) || parseInt(userId) !== parseInt(isRecom?.recommendationDetails?.user_id)) {
            return { status: false, code: 401, message: "Permission denied" };
        }
        return { status: true, favourites: isFav?.favDetails?.recommendation_ids || [] }

    } catch (err) {
        return { status: false, code: 500, message: "Something went wrong" };
    }
}