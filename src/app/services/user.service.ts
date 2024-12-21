import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';
import { serviceError, User, userResponse } from '../utils/types/all.types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { host } from '../utils/http/consts';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userServiceErrorSubject = new Subject<serviceError>();
  userServiceError = this.userServiceErrorSubject.asObservable();

  private userSubject = new BehaviorSubject<User>({
    userName: '',
    email: '',
    token: ''
  });
  user = this.userSubject.asObservable();


  constructor(private http:HttpClient) { }

  signIn(userName:string, password:string) {
    const credentials = {
      userName,
      password
    }
    this.http.post<userResponse>(`${host}/users/login`, credentials)
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
    }
  );
  }
}
