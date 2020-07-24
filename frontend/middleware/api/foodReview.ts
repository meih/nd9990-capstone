import { apiEndpoint } from '../config'
import { FoodReview } from '../types/FoodReview';
import { CreateFoodReviewRequest } from '../types/CreateFoodReviewRequest';
import Axios from 'axios'
import { UpdateFoodReviewRequest } from '../types/UpdateFoodReviewRequest';

export async function getFoodReviews(idToken: string): Promise<FoodReview[]> {

  const response = await Axios.get(`${apiEndpoint}/review`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${idToken}`
    },
  })
  console.log('FoodReviews:', response.data)
  return response.data.items
}

export async function createFoodReview(
  idToken: string,
  newFoodReview: CreateFoodReviewRequest
): Promise<FoodReview> {
  console.log('FoodReview:', newFoodReview)
  const response = await Axios.post(`${apiEndpoint}/review`,  JSON.stringify(newFoodReview), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${idToken}`
    }
  })
  return response.data.item
}

export async function patchFoodReview(
  idToken: string,
  reviewId: string,
  updatedFoodReview: UpdateFoodReviewRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/review/${reviewId}`, JSON.stringify(updatedFoodReview), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${idToken}`
    }
  })
}

export async function deleteFoodReview(
  idToken: string,
  reviewId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/review/${reviewId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  reviewId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/review/${reviewId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
