import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';
import { serviceError } from '../models/ServiceError';
import { sendResetPasswordEmailResponse } from '../models/SendResetPasswordEmailResponse';
import { userResponse } from '../models/UserResponse';
import { User } from '../models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { host } from '../utils/http/consts';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private resetPasswordEmailSentSubject = new Subject<boolean>();
  resetPasswordEmailSent = this.resetPasswordEmailSentSubject.asObservable();

  private userServiceErrorSubject = new Subject<serviceError>();
  userServiceError = this.userServiceErrorSubject.asObservable();

  private userSubject = new BehaviorSubject<User>({
    userName: '',
    email: '',
    token: ''
  });
  user = this.userSubject.asObservable();

  isLoggedIn:boolean = false;


  constructor(private http:HttpClient) { }

  signIn(userName:string, password:string) {
    const credentials = {
      userName,
      password
    }
    this.http.post<userResponse>(`${host}/users/api/v1/login`, credentials)
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
      this.userSubject.next(response.user);
      if(response.user?.token?.length > 0) {
        this.isLoggedIn = true;
      }
    }
  );
  }

  register(userName:string, password:string, email:string) {
    const credentials = {
      email,
      userName,
      password
    }
    this.http.post<userResponse>(`${host}/users/api/v1/createUser`, credentials)
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
      this.userSubject.next(response.user);
      if(response.user?.token?.length > 0) {
        this.isLoggedIn = true;
      }
    }
  );
  }

  sendResetPasswordEmail(userName:string) {
    this.http.post<sendResetPasswordEmailResponse>(`${host}/users/api/v1/sendResetPasswordEmail/${userName}`, {})
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
    .subscribe((response:sendResetPasswordEmailResponse) => {
      this.resetPasswordEmailSentSubject.next(response.success);
    });
  }

  resetPassword(userName:string, password:string, resetCode:number) {
    const body = {
      userName,
      password,
      resetCode,
    }
    this.http.post<userResponse>(`${host}/users/api/v1/updateUserPassword`, body)
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
      this.userSubject.next(response.user);
      if(response.user?.token?.length > 0) {
        this.isLoggedIn = true;
      }
    }
  );
  }
}
