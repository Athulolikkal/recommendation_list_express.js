import { addRecommendationToFav, getPaginatedFavByUserId, removeRecommendationFromFav } from "../../db/repo/favourites.js";
import { getRecommendationDetailsById } from "../../db/repo/recommendation.js";
import { getUserById } from "../../db/repo/users.js";
import { validateCollectionProcess } from "../../utils/validateCollectionAddingAndRemoving.js";

const recommendationController = {
    //adding recommendation to a collection
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
    //removing recommendation from a collection
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
    //view the recommendation of user
    viewUserRecommendations: async (req, res) => {
        try {
            const userId = req?.params?.userid;
            const { limit = 10, page = 1 } = req?.query;
            // if it invalid 
            const pageNumber = parseInt(page, 10);
            const pageSize = parseInt(limit, 10);

            if (isNaN(pageNumber) || pageNumber < 1 || isNaN(pageSize) || pageSize < 1) {
                return res.status(400).json({ status: false, message: 'Invalid pagination parameters' });
            }

            //checking user is valid or not
            const isUser = await getUserById(userId);
            if (!isUser?.status) {
                return res.status(403).json({ status: false, message: 'Invalid user' });
            }
            //fetching details
            const favList = await getPaginatedFavByUserId(userId, pageSize, pageNumber)
            if (favList?.status) {
                const allFavList = []
                if (favList?.list.length > 0) {
                    //each collection
                    for (const collection of favList?.list) {
                        //finding each recommendation details
                        collection.associated_recommendations = []
                        if (collection?.recommendation_ids?.length > 0) {
                            for (const recommendationId of collection?.recommendation_ids) {
                                //finding recommendation details by id
                                const getRecommendationDetails = await getRecommendationDetailsById(recommendationId)
                                if (getRecommendationDetails?.status) {
                                    collection.associated_recommendations.push(getRecommendationDetails?.recommendationDetails)
                                }
                            }
                        }
                        allFavList.push(collection)
                    }
                }
                return res.status(201).json(allFavList)
            }
            return res.status(500).json({ message: 'something went wrong please try again later', status: false })
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'something went wrong please try again later', status: false, error: true })
        }
    }
}

export default recommendationController;