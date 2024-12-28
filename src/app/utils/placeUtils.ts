import { autoCompletePlace } from "./types/all.types";
declare const google: any;

export const getImageForPlace = (place:autoCompletePlace) => {
  const defaultImage = '/defaultPlace.jpg';
  if (!place) return defaultImage;
  return place?.photos?.[0]?.getUrl({'maxWidth': 600, 'maxHeight': 600}) ?? defaultImage;
}

export const getImageFromPlaceId = async (placeId:string) => {
  const { Place } =  await google.maps.importLibrary("places");
  const place = new Place({
    id: placeId,
    requestedLanguage: 'en',
  });
  try {
    await place.fetchFields({ fields: ['photos'] });
    const name = place?.Eg?.photos?.[0]?.name;
    if(!name) return '/defaultPlace.jpg';
    return `https://places.googleapis.com/v1/${name}/media?key=AIzaSyDFxm5VB83m6vpVI5oH4GjKT5W-O4Pphs4&maxHeightPx=400&maxWidthPx=400`;
  } catch (error) {
    console.error('error encountered:');
    console.error(error);
    return '/defaultPlace.jpg';
  }
}