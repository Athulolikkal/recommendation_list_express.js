import favouritesController from "../controllers/favouritesController/index.js";

export default function favouritesRouter(router) {
    router.route('/create').post(favouritesController.createFavourites)
    router.route('/remove/:id').delete(favouritesController.removeFavourites)
    return router;
}