import { addRecommendationToFav, getFavouriteById } from "../../db/repo/favourites.js";
import { getRecommendationDetailsById } from "../../db/repo/recommendation.js";
import { getUserById } from "../../db/repo/users.js";

const recommendationController = {
    addRecommendationToFav: async (req, res) => {
        try {
            const { userId, favId, recommendationId } = req?.body
            // if expected values are missing then!
            if (!userId || !favId || !recommendationId) {
                return res.status(400).json({ status: false, message: 'Required fields are missing' })
            }
            // validating ids
            const isUser = await getUserById(userId);
            const isFav = await getFavouriteById(favId);
            const isRecom = await getRecommendationDetailsById(recommendationId)

            // any item is not valid then
            if (!isUser?.status || !isFav?.status || !isRecom?.status) {
                return res.status(404).json({ status: false, message: 'Invalid ids' })
            }

            //check collection and recommendation is created by the same user
            if (parseInt(userId) !== parseInt(isFav?.favDetails?.user_id) || parseInt(userId) !== parseInt(isRecom?.recommendationDetails?.user_id)) {
                return res.status(401).json({ status: false, message: "Permission denied..." })
            }

            //checking the recommendation already included in the collection
            if (isFav?.favDetails?.recommendation_ids.length > 0 && isFav?.favDetails?.recommendation_ids.includes(recommendationId?.toString())) {
                return res.status(409).json({ status: false, message: 'recommendtion is already present in the collection' })
            }

            //updating collection with new recommendation id
            const addToCollection = await addRecommendationToFav(recommendationId, favId)
            if (addToCollection?.status) {
                return res.status(201).json(addToCollection)
            }
            return res.status(500).json({
                status: false,
                message: 'Faild to update the values'
            });
        } catch (err) {
            console.log(err, ':error happend');
            return res.status(500).json({
                status: false,
                message: 'something went wrong please try again later'
            });
        }
    },
}

export default recommendationController;