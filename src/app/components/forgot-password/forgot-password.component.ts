import { Component } from '@angular/core';
import { CardComponent } from '../uiComponents/card/card.component';
import { TextInputComponent } from '../uiComponents/text-input/text-input.component';
import { ButtonComponent } from '../uiComponents/button/button.component';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../models/RouteNames';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { ErrorMessageComponent } from '../uiComponents/error-message/error-message.component';

@Component({
  selector: 'app-forgot-password',
  imports: [CardComponent, TextInputComponent, ButtonComponent, ErrorMessageComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  ROUTE_NAMES = ROUTE_NAMES;
  userName:string = '';
  userNameHasErrors:boolean = false;
  userNameErrorMessage:string = '';
  sendEmailError:boolean = false;
  loading:boolean = false;
  errorMessage:string = 'There was a problem sending you the reset password email. Please try again.';

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
      if(error?.statusCode === 401) {
        this.sendEmailError = true;
      }
    });
  }

  subscribeToUserService(){
    this.userServiceSubscription = this.userService.resetPasswordEmailSent.subscribe((sent: Boolean) => {
      if(sent) {
        this.resetErrors();
        this.routeTo(ROUTE_NAMES.RESET_PASSWORD);
      } else {
        this.sendEmailError = true;
      }
      this.loading = false;
    });
  }

  sendEmail(){
    this.resetErrors();
    if (this.formIsInvalid()) {
      this.handleErrors();
      return;
    }
    this.loading = true;
    this.userService.sendResetPasswordEmail(this.userName);
  }

  resetErrors(){
    this.userNameHasErrors = false;
    this.userNameErrorMessage = '';
    this.sendEmailError = false;
  }

  formIsInvalid(){
    if (this.userName?.length < 1) return true;
    return false;
  }

  handleErrors(){
    if (this.userName?.length < 1) {
      this.userNameHasErrors = true;
      this.userNameErrorMessage = 'UserName is required';
    }
  }

  routeTo(route:string){
    this.router.navigate([route])
  }
}
