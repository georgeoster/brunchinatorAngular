import { Review } from "./Review"
export type getReviewsByUserNameResponse = {
  success:boolean,
  reviews: Array<Review>
}