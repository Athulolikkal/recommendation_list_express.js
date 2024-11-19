import favouritesController from "../controllers/favouritesController/index.js";

export default function favouritesRouter(router) {
    //creating new collection
    router.route('/create').post(favouritesController.createFavourites)
    //removing collection by id
    router.route('/remove/:id').delete(favouritesController.removeFavourites)
    return router;
}