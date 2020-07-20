/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateFoodReviewRequest {
  name: string
  dueDate: string
  done: boolean
}