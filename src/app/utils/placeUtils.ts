import { autoCompletePlace } from "./types/all.types";

export const getImageForPlace = (place:autoCompletePlace) => {
  const defaultImage = '/defaultPlace.jpg';
  if (!place) return defaultImage;
  return place?.photos?.[0]?.getUrl({'maxWidth': 600, 'maxHeight': 600}) ?? defaultImage;
}