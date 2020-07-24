import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getFoodReviewById } from '../../businessLogic/foodReview'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)

  const reviewId = event.pathParameters.foodReviewId
  const userId = getUserId(event)
  const items = await getFoodReviewById(userId, reviewId)

  console.log(items)

  const response = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        items
    }),
  };

  return response
}
