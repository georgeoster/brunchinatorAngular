import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';
import { serviceError, User, userResponse } from '../types/all.types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLoggedInSubject = new BehaviorSubject(false);
  isLoggedIn = this.isLoggedInSubject.asObservable();

  private userServiceErrorSubject = new Subject<serviceError>();
  userServiceError = this.userServiceErrorSubject.asObservable();

  private userSubject = new Subject<User>();
  user = this.userSubject.asObservable();


  constructor(private http:HttpClient) { }

  signIn(userName:string, password:string) {
    const credentials = {
      userName,
      password
    }
    this.http.post<userResponse>('http://brunchinatorbeanstalk-env.eba-i3r2rbwp.us-east-2.elasticbeanstalk.com/users/login', credentials)
    .pipe(catchError(
      (error: HttpErrorResponse) => {
        const serviceError = {
          statusCode: error.status,
          message: error.error.message,
        }
        this.userServiceErrorSubject.next(serviceError);
        return throwError(() => new Error('something went wrong. please try again later.'));
      }
    ))
    .subscribe((response:userResponse) => {
      this.isLoggedInSubject.next(response.success);
      this.userSubject.next(response.user);
    }
  );
  }
}
