import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const XAWS = AWSXRay.captureAWS(AWS)

import { FoodReview } from '../models/FoodReview'
import { FoodReviewUpdate } from '../models/FoodReviewUpdate'
import { UpdateFoodReviewRequest } from '../requests/UpdateFoodReviewRequest'

export class FoodReviewAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly foodReviewTable = process.env.FOOD_REVIEW_TABLE) {
  }

  async getAllFoodReviews(
    userId: string
  ): Promise<FoodReview[]> {
    console.log('Getting all food reviews')

    const result = await this.docClient.query({
      TableName : this.foodReviewTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
          ':userId': userId
      }
    }).promise()

    const items = result.Items
    return items as FoodReview[]
  }

  async createFoodReview(foodReview: FoodReview): Promise<FoodReview> {
    await this.docClient.put({
      TableName: this.foodReviewTable,
      Item: foodReview
    }).promise()

    return foodReview
  }

  async updateFoodReview(
    userId: string,
    reviewId: string,
    foodReviewUpdate: UpdateFoodReviewRequest
    ): Promise<FoodReview> {
    await this.docClient.update({
      TableName: this.foodReviewTable,
      Key: {
        'userId': userId,
        'reviewId': reviewId
      },
      UpdateExpression: 'set #name = :name, caption = :caption, review = :review, shopUrl = :shopUrl',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: {
        ':name' : foodReviewUpdate.name,
        ':caption' : foodReviewUpdate.caption,
        ':review' : foodReviewUpdate.review,
        ':shopUrl' : foodReviewUpdate.shopUrl
      }
    }).promise()

    return
  }

  async deleteFoodReview(userId: string, reviewId: string): Promise<FoodReview> {
    await this.docClient.delete({
      TableName: this.foodReviewTable,
      Key: {
        'userId': userId,
        'reviewId': reviewId
      }
    }).promise()

    return
  }


  async setAttachmentUrl(
    userId: string,
    reviewId: string,
    attachmentUrl: string
    ): Promise<FoodReview> {
    await this.docClient.update({
      TableName: this.foodReviewTable,
      Key: {
        'userId': userId,
        'reviewId': reviewId
      },
      UpdateExpression: 'set attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: {
        ':attachmentUrl' : attachmentUrl
      }
    }).promise()

    return
  }

}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}
