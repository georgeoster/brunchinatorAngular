import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { Review, User } from '../../../utils/types/all.types';
import { GetReviewsService } from '../../../services/get-reviews.service';
import { ProfilePlaceCardComponent } from "../../uiComponents/profile-place-card/profile-place-card.component";
import { StarRatingComponent } from '../../uiComponents/star-rating/star-rating.component';

@Component({
  selector: 'brunch-profile-reviews',
  imports: [ProfilePlaceCardComponent, NgFor, NgIf, StarRatingComponent],
  templateUrl: './profile-reviews.component.html',
  styleUrl: './profile-reviews.component.css'
})
export class ProfileReviewsComponent {

  user!:User;
  reviews!:Array<Review>;
  userServiceSubscription:Subscription = new Subscription();
  getReviewsServiceSubscription:Subscription = new Subscription();
  months:Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private userService: UserService, private getReviewsService: GetReviewsService) {
    this.subscribeToGetReviewsService();
    this.subscribeToUserService();
  }

  formatDate(s:string) {
    const d = new Date(s); 
    return `${this.months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  subscribeToUserService() {
    this.userServiceSubscription = this.userService.user.subscribe((user:User) => {
      if(user?.userName?.length > 0) {
        this.user = user;
        this.getReviewsService.getReviewsByUserName(user.userName);
      }
    })
  }

  subscribeToGetReviewsService() {
    this.getReviewsServiceSubscription = this.getReviewsService.reviewsByUserName.subscribe((reviews:Array<Review>) => {
      this.reviews = reviews.sort((a,b) => {
       return +(new Date(b.reviewDate)) - +(new Date(a.reviewDate));
      });
    })
  }

  ngOnDestroy() {
    this.userServiceSubscription.unsubscribe();
    this.getReviewsServiceSubscription.unsubscribe();
  }
}
