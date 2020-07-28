import { apiEndpoint } from '../config'
import { FavoriteReview } from '../types/FavoriteReview';
import Axios from 'axios'

export async function getFavoriteReviews(idToken: string): Promise<FavoriteReview[]> {
  const response = await Axios.get(`${apiEndpoint}/favorite`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${idToken}`
    },
  })
  return response.data.items
}

export async function createFavoriteReview(
  idToken: string,
  reviewId: string
): Promise<FavoriteReview> {
  const response = await Axios.post(`${apiEndpoint}/favorite/${reviewId}`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${idToken}`
    }
  })
  return response.data.item
}

export async function deleteFavoriteReview(
  idToken: string,
  reviewId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/favorite/${reviewId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${idToken}`
    }
  })
}
