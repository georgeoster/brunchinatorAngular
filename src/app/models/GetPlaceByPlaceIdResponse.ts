import { Place } from "./Place"
export type getPlaceByPlaceIdResponse = {
  success:boolean,
  placeExists:boolean,
  place: Place
}