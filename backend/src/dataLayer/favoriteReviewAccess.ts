import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const XAWS = AWSXRay.captureAWS(AWS)

import { FavoriteReview } from '../models/FavoriteReview'

export class FavoriteReviewAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly favoriteReviewTable = process.env.FAVORITE_REVIEW_TABLE) {
  }

  async getFavoriteReviews(
    userId: string
  ): Promise<FavoriteReview[]> {
    console.log('Getting food reviews')

    const result = await this.docClient.query({
      TableName : this.favoriteReviewTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
          ':userId': userId
      }
    }).promise()

    const items = result.Items
    return items as FavoriteReview[]
  }

  async createFavoriteReview(favoriteReview: FavoriteReview): Promise<FavoriteReview> {
    await this.docClient.put({
      TableName: this.favoriteReviewTable,
      Item: favoriteReview
    }).promise()

    return favoriteReview
  }

  async deleteFavoriteReview(userId: string, reviewId: string): Promise<FavoriteReview> {
    await this.docClient.delete({
      TableName: this.favoriteReviewTable,
      Key: {
        'userId': userId,
        'reviewId': reviewId
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
