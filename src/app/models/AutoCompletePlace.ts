export type autoCompletePlace = {
  place_id: string,
  name: string,
  vicinity: string,
  formatted_phone_number: string,
  photos: Array<googlePlacesPhotosArrayObject>
}

type googlePlacesPhotosArrayObject = {
  height: number,
  width: number,
  html_attributions: Array<string>,
  getUrl: Function
}