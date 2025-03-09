import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import { ProfileReviewsComponent } from "../profile-reviews/profile-reviews.component";
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../models/User';



@Component({
  selector: 'brunch-profile',
  imports: [ProfilePictureComponent, ProfileReviewsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userServiceSubscription:Subscription = new Subscription();
  paramMapSubscription: Subscription = new Subscription();
  signedInUser!:User;
  userName!:string;
  profileIsSignedInUser:boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private userService:UserService){
    this.subscribeToUserService();
  }

  ngOnInit() {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe((params) => {
      this.userName = params.get('userName') ?? '';
      this.profileIsSignedInUser = this.userName == this.signedInUser?.userName;
    });
  }

  ngOnDestroy() {
    this.userServiceSubscription.unsubscribe();
    this.paramMapSubscription.unsubscribe();
  }

  subscribeToUserService(){
    this.userServiceSubscription = this.userService.user.subscribe((user: User) => {
      this.signedInUser = user;
      this.profileIsSignedInUser = this.userName == this.signedInUser?.userName;
    });
  }
}
