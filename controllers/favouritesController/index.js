import { addFavourite, getFavouriteByUserIdAndName } from "../../db/repo/favourites.js";
import { getUserById } from "../../db/repo/users.js";

const favouritesController = {
    //Creating collection
    createFavourites: async (req, res) => {
        try {
            const { userId, newCollectionName, description } = req?.body;
            // Validate input values
            if (!userId || !newCollectionName || !description) {
                return res.status(400).json({
                    status: false,
                    message: 'Required fields are missing. Please provide userId, newCollectionName, and description.'
                });
            }
            // Check if the user exists
            const isUser = await getUserById(userId);
            if (!isUser?.status) {
                return res.status(404).json({
                    status: false,
                    message: 'User not found or invalid userId.'
                });
            }
            // Check if a collection with the same name already exists for this user
            const existingItem = await getFavouriteByUserIdAndName(userId, newCollectionName);
            if (existingItem?.status && existingItem?.favourite?.length > 0) {
                return res.status(409).json({
                    status: false,
                    message: 'A collection with the same name already exists for this user.'
                });
            }
            // Create the new favourite collection
            const createFavourites = await addFavourite(userId, newCollectionName, description);
            if (createFavourites?.status) {
                console.log('New favourite collection created:', createFavourites);
                return res.status(201).json({
                    status: true,
                    message: 'New favourite collection created successfully.',
                    data: createFavourites
                });
            } else {
                return res.status(500).json({
                    status: false,
                    message: 'Unable to create the new collection. Please try again later.'
                });
            }

        } catch (err) {
            console.error('Error in createFavourites:', err);
            return res.status(500).json({
                status: false,
                message: 'Something went wrong while creating the favourite collection. Please try again later.'
            });
        }
    },
    // Remove collection
    removeFavourites: async (req, res) => {
        try {
            console.log('remove favourites');
        } catch (err) {
            console.log(err);
        }
    }

}

export default favouritesController;