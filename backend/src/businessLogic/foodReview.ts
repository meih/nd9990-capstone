import * as uuid from 'uuid'

import { FoodReview } from '../models/FoodReview'
import { FoodReviewAccess } from '../dataLayer/foodReviewAccess'
import { CreateFoodReviewRequest } from '../requests/CreateFoodReviewRequest'
import { UpdateFoodReviewRequest } from '../requests/UpdateFoodReviewRequest'

const foodReviewAccess = new FoodReviewAccess()

export async function getAllFoodReviews(
  userId: string
): Promise<FoodReview[]> {
  return foodReviewAccess.getAllFoodReviews(userId)
}

export async function createFoodReview(
  userId: string,
  createFoodReviewRequest: CreateFoodReviewRequest
): Promise<FoodReview> {

  const itemId = uuid.v4()

  return await foodReviewAccess.createFoodReview({
    reviewId: itemId,
    userId: userId,
    createdAt: new Date().toISOString(),
    name: createFoodReviewRequest.name,
    caption: createFoodReviewRequest.caption,
    review: createFoodReviewRequest.review,
    shopUrl: createFoodReviewRequest.shopUrl,
    attachmentUrl: null
  })
}

export async function updateFoodReview(
  userId: string,
  reviewId: string,
  updateFoodReviewRequest: UpdateFoodReviewRequest
): Promise<FoodReview> {
  return foodReviewAccess.updateFoodReview(userId, reviewId, updateFoodReviewRequest)
}

export async function deleteFoodReview(
  userId: string,
  reviewId: string
): Promise<FoodReview> {
  return foodReviewAccess.deleteFoodReview(userId, reviewId)
}

export async function setAttachmentUrl(
  userId: string,
  reviewId: string,
  url: string
): Promise<FoodReview> {
  return foodReviewAccess.setAttachmentUrl(userId, reviewId, url)
}
