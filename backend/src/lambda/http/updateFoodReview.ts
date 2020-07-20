import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateFoodReviewRequest } from '../../requests/UpdateFoodReviewRequest'
import { updateFoodReview } from '../../businessLogic/foodReview'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)

  const reviewId = event.pathParameters.reviewId
  const userId = getUserId(event)
  const updatedTodo: UpdateFoodReviewRequest = JSON.parse(event.body)
  const items = await updateFoodReview(userId, reviewId, updatedTodo)

  console.log(items)

  const response = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
    }),
  };

  return response
}
