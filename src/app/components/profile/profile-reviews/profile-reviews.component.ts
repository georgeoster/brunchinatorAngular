import { Component, Input } from '@angular/core';
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

  @Input() userName!:string;
  reviews!:Array<Review>;
  userServiceSubscription:Subscription = new Subscription();
  getReviewsServiceSubscription:Subscription = new Subscription();
  months:Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private getReviewsService: GetReviewsService) {
  }

  ngOnInit() {
    this.subscribeToGetReviewsService();
    this.getReviewsService.getReviewsByUserName(this.userName);
  }

  formatDate(s:string) {
    const d = new Date(s); 
    return `${this.months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
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
