import recommendationController from "../controllers/recommendationController/index.js";

export default function recommendationRouter(router) {
    // adding recommendation to collection
    router.route('/addtofav').put(recommendationController.addRecommendationToFav)
    // removing recommendation from collection
    router.route('/removefromfav').put(recommendationController.removeRecommendationFromFav)
    // viewing user collection [paginated view] 
    router.route('/viewfromfav/:userid').get(recommendationController.viewUserRecommendations)
    return router;
}