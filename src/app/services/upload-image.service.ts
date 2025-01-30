import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
import { host } from '../utils/http/consts';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private uploadImageResponseSubject = new Subject();
  uploadImageResponse = this.uploadImageResponseSubject.asObservable();

  constructor(private http:HttpClient) { }

  uploadImage(body:any) {
    this.http.post(`${host}/users/api/v1/userProfilePicture`, body)
    .pipe(catchError(
      (error: HttpErrorResponse) => {
        const serviceError = {
          statusCode: error.status,
          message: error.error.message,
        }
        this.uploadImageResponseSubject.next(serviceError);
        return throwError(() => new Error('something went wrong. please try again later.'));
      }
    ))
    .subscribe((response:any) => {
      this.uploadImageResponseSubject.next(response);
    })
  }


}
