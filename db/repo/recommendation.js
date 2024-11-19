import { executeQuery, sql } from "../config.js";

//check recommendation is valid or not
export const getRecommendationDetailsById = async (recommendationId) => {
    const query = async () => await sql`SELECT * FROM public.recommendations WHERE id = ${recommendationId}`
    const isRecommendationDetails = await executeQuery(query)
    if (isRecommendationDetails && Array.isArray(isRecommendationDetails) && isRecommendationDetails?.length > 0) {
        return { status: true, recommendationDetails: isRecommendationDetails[0] }
    }
    return { status: false, error: true }
}