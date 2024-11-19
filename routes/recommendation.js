import recommendationController from "../controllers/recommendationController/index.js";

export default function recommendationRouter(router) {
    router.route('/addtofav').put(recommendationController.addRecommendationToFav)
    return router;
}