import favouritesRouter from "./favourites.js";
import recommendationRouter from "./recommendation.js"

export default function routes(app, router) {
    // all apis starts with
    app.use('/api/v1', router);
    //router for collections
    router.use('/favourites', favouritesRouter(router));
    //router for recommendation related apis
    router.use('/recommendation', recommendationRouter(router))
}