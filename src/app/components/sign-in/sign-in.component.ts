import { Component } from '@angular/core';
import { CardComponent } from '../uiComponents/card/card.component';
import { TextInputComponent } from '../uiComponents/text-input/text-input.component';
import { ButtonComponent } from '../uiComponents/button/button.component';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../utils/types/globalsConsts';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../utils/types/all.types';
import { ErrorMessageComponent } from '../uiComponents/error-message/error-message.component';

@Component({
  selector: 'brunch-sign-in',
  imports: [CardComponent, TextInputComponent, ButtonComponent, ErrorMessageComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  ROUTE_NAMES = ROUTE_NAMES;
  userName:string = '';
  password:string = '';
  userNameHasErrors:boolean = false;
  passwordHasErrors:boolean = false;
  userNameErrorMessage:string = '';
  passwordErrorMessage:string = '';
  signInError:boolean = false;
  loading:boolean = false;
  errorMessage:string = 'We can\'t find that username and password.';

  userServiceErrorSubscription:Subscription = new Subscription;
  userServiceSubscription:Subscription = new Subscription;

  constructor(private router: Router, private userService: UserService) {
    this.subscribeToUserService();
    this.subscribeToUserServiceErrorSubscription();
  }

  ngOnDestroy() {
    this.userServiceErrorSubscription.unsubscribe();
  }

  subscribeToUserServiceErrorSubscription(){
    this.userServiceErrorSubscription = this.userService.userServiceError.subscribe((error) => {
      this.resetErrors();
      this.loading = false;
      if(error?.statusCode === 401) {
        this.signInError = true;
      }
    });
  }

  subscribeToUserService(){
    this.userServiceSubscription = this.userService.user.subscribe((user: User) => {
      if(user?.token?.length > 0) {
        this.resetErrors();
        this.routeTo('home');
      }
      this.loading = false;
    });
  }

  handleSignIn(){
    this.resetErrors();
    if (this.formIsInvalid()) {
      this.handleErrors();
      return;
    }
    this.loading = true;
    this.userService.signIn(this.userName, this.password);
  }

  resetErrors(){
    this.userNameHasErrors = false;
    this.userNameErrorMessage = '';
    this.passwordHasErrors = false;
    this.passwordErrorMessage = '';
    this.signInError = false;
  }

  formIsInvalid(){
    if (this.userName?.length < 1) return true;
    if (this.password?.length < 1) return true;
    return false;
  }

  handleErrors(){
    if (this.userName?.length < 1) {
      this.userNameHasErrors = true;
      this.userNameErrorMessage = 'UserName is required';
    }
    if (this.password?.length < 1) {
      this.passwordHasErrors = true;
      this.passwordErrorMessage = 'Password is required';
    }
  }

  routeTo(route:string){
    this.router.navigate([route])
  }
}
