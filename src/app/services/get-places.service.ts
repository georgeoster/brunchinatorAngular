import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';
import { serviceError } from '../models/ServiceError';
import { getPlaceByPlaceIdResponse } from '../models/GetPlaceByPlaceIdResponse';
import { Place } from '../models/Place';
import { getPlacesResponse } from '../models/GetPlacesResponse';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { host } from '../utils/http/consts';

@Injectable({
  providedIn: 'root'
})
export class GetPlacesService {

  private placesSubject = new BehaviorSubject<Array<Place>>([]);
  places = this.placesSubject.asObservable();

  private placeByPlaceIdSubject = new Subject<Place>();
  placeByPlaceId = this.placeByPlaceIdSubject.asObservable();

  private getPlacesErrorSubject = new Subject<serviceError>();
  getPlacesError = this.getPlacesErrorSubject.asObservable();

  constructor(private http:HttpClient) {}

  getPlaces() {
    this.http.get<getPlacesResponse>(`${host}/places/api/v1/all`)
    .pipe(catchError(
      (error: HttpErrorResponse) => {
        const serviceError = {
          statusCode: error.status,
          message: error.error.message,
        }
        this.getPlacesErrorSubject.next(serviceError);
        return throwError(() => new Error('something went wrong. please try again later.'));
      }
    ))
    .subscribe((response:getPlacesResponse) => {
      this.placesSubject.next(response.places);
    }
  );
  }

  getPlaceByPlaceId(placeId:string) {
    this.http.get<getPlaceByPlaceIdResponse>(`${host}/places/api/v1/byPlaceId/${placeId}`)
    .pipe(catchError(
      (error: HttpErrorResponse) => {
        const serviceError = {
          statusCode: error.status,
          message: error.error.message,
        }
        this.getPlacesErrorSubject.next(serviceError);
        return throwError(() => new Error('something went wrong. please try again later.'));
      }
    ))
    .subscribe((response:getPlaceByPlaceIdResponse) => {
      this.placeByPlaceIdSubject.next(response.place);
    }
  );
  }
}
