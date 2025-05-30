import { Component } from '@angular/core';
import { CardComponent } from '../uiComponents/card/card.component';
import { TextInputComponent } from '../uiComponents/text-input/text-input.component';
import { ButtonComponent } from '../uiComponents/button/button.component';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../models/RouteNames';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/User';
import { ErrorMessageComponent } from '../uiComponents/error-message/error-message.component';

@Component({
  selector: 'app-reset-password',
  imports: [CardComponent, TextInputComponent, ButtonComponent, ErrorMessageComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  ROUTE_NAMES = ROUTE_NAMES;
  securityCode:string = '';
  userName:string = '';
  password:string = '';
  securityCodeHasErrors:boolean = false;
  userNameHasErrors:boolean = false;
  passwordHasErrors:boolean = false;
  securityCodeErrorMessage:string = '';
  userNameErrorMessage:string = '';
  passwordErrorMessage:string = '';
  resetError:boolean = false;
  loading:boolean = false;
  errorMessage:string = 'We had a problem resetting your password. Please try again.';

  userServiceErrorSubscription:Subscription = new Subscription;
  userServiceSubscription:Subscription = new Subscription;

  constructor(private router: Router, private userService: UserService) {
    this.subscribeToUserService();
    this.subscribeToUserServiceErrorSubscription();
  }

  ngOnDestroy() {
    this.userServiceErrorSubscription.unsubscribe();
    this.userServiceSubscription.unsubscribe();
  }

  subscribeToUserServiceErrorSubscription(){
    this.userServiceErrorSubscription = this.userService.userServiceError.subscribe((error) => {
      this.resetErrors();
      this.loading = false;
      if(error?.statusCode ) {
        this.resetError = true;
        this.errorMessage = error.message ?? 'We had a problem resetting your password. Please try again.';
      }
    });
  }

  subscribeToUserService(){
    this.userServiceSubscription = this.userService.user.subscribe((user: User) => {
      if(user?.token?.length > 0) {
        this.resetErrors();
        this.routeTo(ROUTE_NAMES.HOME);
      }
      this.loading = false;
    });
  }

  resetPassword(){
    this.resetErrors();
    if (this.formIsInvalid()) {
      this.handleErrors();
      return;
    }
    this.loading = true;
    const resetCode = parseInt(this.securityCode);
    this.userService.resetPassword(this.userName, this.password, resetCode);
  }

  resetErrors(){
    this.userNameHasErrors = false;
    this.userNameErrorMessage = '';
    this.passwordHasErrors = false;
    this.passwordErrorMessage = '';
    this.securityCodeHasErrors = false;
    this.securityCodeErrorMessage = '';
    this.resetError = false;
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
    if (this.securityCode?.length < 1) {
      this.securityCodeHasErrors = true;
      this.securityCodeErrorMessage = 'Security Code is required';
    }
  }

  routeTo(route:string){
    this.router.navigate([route])
  }
}
