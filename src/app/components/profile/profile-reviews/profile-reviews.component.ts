import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Review } from '../../../models/Review';
import { User } from '../../../models/User';
import { GetReviewsService } from '../../../services/get-reviews.service';
import { ProfilePlaceCardComponent } from "../../uiComponents/profile-place-card/profile-place-card.component";
import { StarRatingComponent } from '../../uiComponents/star-rating/star-rating.component';
import { Router } from '@angular/router';

@Component({
  selector: 'brunch-profile-reviews',
  imports: [ProfilePlaceCardComponent, StarRatingComponent],
  templateUrl: './profile-reviews.component.html',
  styleUrl: './profile-reviews.component.css'
})
export class ProfileReviewsComponent {

  @Input() userName!:string;
  @Input() profileIsSignedInUser:boolean = false;
  reviews!:Array<Review>;
  getReviewsServiceSubscription:Subscription = new Subscription();
  months:Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(
    private getReviewsService: GetReviewsService, 
    private router:Router,
  ) {
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
    this.getReviewsServiceSubscription.unsubscribe();
  }

  navigateToPlace(review:Review) {
    this.router.navigateByUrl(`/place/${review.placeId}`);
  }

  get title() {
    return this.profileIsSignedInUser ? `Places I have been`: `Places ${this.userName} has been`;
  }
}
