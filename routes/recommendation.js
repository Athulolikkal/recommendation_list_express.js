import recommendationController from "../controllers/recommendationController/index.js";

export default function recommendationRouter(router) {
    router.route('/addtofav').put(recommendationController.addRecommendationToFav)
    router.route('/removefromfav').put(recommendationController.removeRecommendationFromFav)
    return router;
}