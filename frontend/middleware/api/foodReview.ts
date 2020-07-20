import { apiEndpoint } from '../config'
import { FoodReview } from '../types/FoodReview';
import { CreateFoodReviewRequest } from '../types/CreateFoodReviewRequest';
import Axios from 'axios'
import { UpdateFoodReviewRequest } from '../types/UpdateFoodReviewRequest';

export async function getFoodReviews(idToken: string): Promise<FoodReview[]> {
  console.log('Fetching todos')

  const response = await Axios.get(`${apiEndpoint}/todos`, {
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
  const response = await Axios.post(`${apiEndpoint}/todos`,  JSON.stringify(newFoodReview), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${idToken}`
    }
  })
  return response.data.item
}

export async function patchFoodReview(
  idToken: string,
  todoId: string,
  updatedFoodReview: UpdateFoodReviewRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/todos/${todoId}`, JSON.stringify(updatedFoodReview), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${idToken}`
    }
  })
}

export async function deleteFoodReview(
  idToken: string,
  todoId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  todoId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/todos/${todoId}/attachment`, '', {
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
