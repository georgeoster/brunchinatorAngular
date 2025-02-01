import { autoCompletePlace } from "./types/all.types";
declare const google: any;

export const getImageForPlace = (place:autoCompletePlace) => {
  const defaultImage = '/defaultPlace.jpg';
  if (!place) return defaultImage;
  return place?.photos?.[0]?.getUrl({'maxWidth': 600, 'maxHeight': 600}) ?? defaultImage;
}

export const getImageFromPlaceId = async (placeId:string, map:any) => {
  try {
    const place = await getPlaceDetails(placeId, map);
    return getImageForPlace(place as autoCompletePlace);
  } catch (error) {
    return 'defaultPlace.jpg'
  }
}

const getPlaceDetails = async (placeId:string, map:any) => {
  return new Promise((resolve, reject) => {
    const mapRef = new google.maps.Map(map, {
      center: {lat: -33.866, lng: 151.196},
      zoom: 15
    });
    const request = {
      placeId: placeId,
      fields: ['photos']
    };
    const placesService = new google.maps.places.PlacesService(mapRef);
    placesService.getDetails(request, (place:any, status:any) => {
      if(status === 'OK') {
        resolve(place);
      }
      reject();
    });
  });
}