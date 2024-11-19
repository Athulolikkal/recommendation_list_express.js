import { addRecommendationToFav, removeRecommendationFromFav } from "../../db/repo/favourites.js";
import { validateCollectionProcess } from "../../utils/validateCollectionAddingAndRemoving.js";

const recommendationController = {
    addRecommendationToFav: async (req, res) => {
        try {
            const { userId, favId, recommendationId } = req?.body
            // if expected values are missing then!
            if (!userId || !favId || !recommendationId) {
                return res.status(400).json({ status: false, message: 'Required fields are missing' })
            }

            const validateProcess = await validateCollectionProcess(userId, favId, recommendationId)

            //if validation fails
            if (!validateProcess?.status) {
                return res.status(validateProcess.code).json({ status: validateProcess?.status, message: validateProcess.message })
            }

            //checking the recommendation already included in the collection
            if (validateProcess?.favourites?.length > 0 && validateProcess?.favourites?.includes(recommendationId?.toString())) {
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
    removeRecommendationFromFav: async (req, res) => {
        try {
            const { userId, favId, recommendationId } = req?.body
            //if values are not present
            if (!userId || !favId || !recommendationId) {
                return res.status(400).json({ status: false, message: 'Required fields are missing' })
            }
            const validateProcess = await validateCollectionProcess(userId, favId, recommendationId)
            //if validation fails
            if (!validateProcess?.status) {
                return res.status(validateProcess.code).json({ status: validateProcess?.status, message: validateProcess.message })
            }
            //removing recommendation id from the collection
            const removeRecommendationIdFromFav = await removeRecommendationFromFav(favId, recommendationId)
            if (removeRecommendationIdFromFav?.status) {
                return res.status(200).json(removeRecommendationIdFromFav)
            }
            return res.status(500).json({
                status: false,
                message: 'Faild to remove the recommendation'
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: false,
                message: 'something went wrong please try again later'
            });
        }
    },
}

export default recommendationController;