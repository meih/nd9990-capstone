import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { createFavoriteReview } from '../../businessLogic/favoriteReview'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)

  const reviewId = event.pathParameters.foodReviewId
  const userId = getUserId(event)
  const newFavoriteReview = await createFavoriteReview(
    userId,
    reviewId
  );

  console.log(newFavoriteReview)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item: newFavoriteReview
    })
  }

}
