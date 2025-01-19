import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';
import { getReviewsByUserNameResponse, Review, serviceError } from '../utils/types/all.types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { host } from '../utils/http/consts';

@Injectable({
  providedIn: 'root'
})
export class GetReviewsService {

  private reviewsByUserNameSubject = new BehaviorSubject<Array<Review>>([]);
  reviewsByUserName = this.reviewsByUserNameSubject.asObservable();

  private reviewsByPlaceIdSubject = new BehaviorSubject<Array<Review>>([]);
  reviewsByPlaceId = this.reviewsByPlaceIdSubject.asObservable();

  private getReviewsErrorSubject = new Subject<serviceError>();
  getReviewsError = this.getReviewsErrorSubject.asObservable();

  constructor(private http:HttpClient) { }

  getReviewsByUserName(username:string) {
    this.http.get<getReviewsByUserNameResponse>(`${host}/reviews/byUserName/${username}`)
    .pipe(catchError(
      (error: HttpErrorResponse) => {
        const serviceError = {
          statusCode: error.status,
          message: error.error.message,
        }
        this.getReviewsErrorSubject.next(serviceError);
        return throwError(() => new Error('something went wrong. please try again later.'));
      }
    ))
    .subscribe((response:getReviewsByUserNameResponse) => {
      this.reviewsByUserNameSubject.next(response.reviews);
    }
  );
  }

  getReviewsByPlaceId(placeId:string) {
    this.http.get<getReviewsByUserNameResponse>(`${host}/reviews/byPlaceId/${placeId}`)
    .pipe(catchError(
      (error: HttpErrorResponse) => {
        const serviceError = {
          statusCode: error.status,
          message: error.error.message,
        }
        this.getReviewsErrorSubject.next(serviceError);
        return throwError(() => new Error('something went wrong. please try again later.'));
      }
    ))
    .subscribe((response:getReviewsByUserNameResponse) => {
      this.reviewsByPlaceIdSubject.next(response.reviews);
    }
  );
  }
}
