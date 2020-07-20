import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateFoodReviewRequest } from '../../requests/CreateFoodReviewRequest'
import { createFoodReview } from '../../businessLogic/foodReview'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)

  const foodReviewRequest: CreateFoodReviewRequest = JSON.parse(event.body)
  const userId = getUserId(event)
  const newFoodReview = await createFoodReview(
    userId,
    foodReviewRequest
  );

  console.log(newFoodReview)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item: newFoodReview
    })
  }

}
