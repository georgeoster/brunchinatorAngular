import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';
import { addReviewResponse, Review, serviceError } from '../utils/types/all.types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { host } from '../utils/http/consts';

@Injectable({
  providedIn: 'root'
})
export class AddReviewService {

  private successfullyAddedReviewSubject = new BehaviorSubject(false);
  successfullyAddedReview = this.successfullyAddedReviewSubject.asObservable();

  private addReviewErrorSubject = new Subject<serviceError>();
  addReviewError = this.addReviewErrorSubject.asObservable();

  constructor(private http:HttpClient) { }

  addReview(review:Review) {
    this.http.post<addReviewResponse>(`${host}/reviews/createReview`, review)
    .pipe(catchError(
      (error: HttpErrorResponse) => {
        const serviceError = {
          statusCode: error.status,
          message: error.error.message,
        }
        this.addReviewErrorSubject.next(serviceError);
        return throwError(() => new Error('something went wrong. please try again later.'));
      }
    ))
    .subscribe((response:addReviewResponse) => {
      this.successfullyAddedReviewSubject.next(response.success);
    }
  );
  }
}
