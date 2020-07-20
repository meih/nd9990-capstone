/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateFoodReviewRequest {
  name: string
  caption: string
  review: string
  shopUrl?: string
}
