import favouritesRouter from "./favourites.js";
import recommendationRouter from "./recommendation.js"

export default function routes(app, router) {
    app.use('/api/v1', router);
    router.use('/favourites', favouritesRouter(router));
    router.use('/recommendation', recommendationRouter(router))
}