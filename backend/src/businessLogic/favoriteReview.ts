import { FavoriteReview } from '../models/FavoriteReview'
import { FavoriteReviewAccess } from '../dataLayer/favoriteReviewAccess'

const foodReviewAccess = new FavoriteReviewAccess()

export async function getFavoriteReviews(
  userId: string
): Promise<FavoriteReview[]> {
  return foodReviewAccess.getFavoriteReviews(userId)
}

export async function createFavoriteReview(
  userId: string,
  reviewId: string
): Promise<FavoriteReview> {

  return await foodReviewAccess.createFavoriteReview({
    userId: userId,
    reviewId: reviewId,
  })
}

export async function deleteFavoriteReview(
  userId: string,
  reviewId: string
): Promise<FavoriteReview> {
  return foodReviewAccess.deleteFavoriteReview(userId, reviewId)
}
