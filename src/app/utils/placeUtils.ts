import { autoCompletePlace } from "../models/AutoCompletePlace";
import { host } from "./http/consts";
declare const google: any;

export const getImageForPlace = (place:autoCompletePlace) => {
  const defaultImage = '/defaultPlace.jpg';
  if (!place) return defaultImage;
  return place?.photos?.[0]?.getUrl({'maxWidth': 600, 'maxHeight': 600}) ?? defaultImage;
}

export const getImageFromPlaceId = async (placeId: string): Promise<string> => {
  try {
    const res = await fetch(`${host}/places/api/v1/place-photo-url/${placeId}`);//${host}/reviews/
    const json = await res.json();
    return `${host}/places/${json.photoUrl}`;
  } catch {
    return '/defaultPlace.jpg';
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