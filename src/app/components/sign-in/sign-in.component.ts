import { Component } from '@angular/core';
import { CardComponent } from '../uiComponents/card/card.component';
import { TextInputComponent } from '../uiComponents/text-input/text-input.component';
import { ButtonComponent } from '../uiComponents/button/button.component';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../types/globalsConsts';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'brunch-sign-in',
  imports: [CardComponent, TextInputComponent, ButtonComponent],
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

  userServiceErrorSubscription:Subscription = new Subscription;

  constructor(private router: Router, private userService: UserService) {
    this.subscribeToUserServiceErrorSubscription();
  }

  ngOnDestroy() {
    this.userServiceErrorSubscription.unsubscribe();
  }

  subscribeToUserServiceErrorSubscription(){
    this.userServiceErrorSubscription = this.userService.userServiceError.subscribe((error) => {
      console.log('signin component gets this error:');
      console.log(error);
    });
  }

  handleSignIn(){
    this.resetErrors();
    if (this.formIsInvalid()) {
      this.handleErrors();
      return;
    }
    this.userService.signIn(this.userName, this.password);
  }

  resetErrors(){
    this.userNameHasErrors = false;
    this.userNameErrorMessage = '';
    this.passwordHasErrors = false;
    this.passwordErrorMessage = '';
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
