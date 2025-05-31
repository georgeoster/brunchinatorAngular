import { Component, Input } from '@angular/core';
import { Review } from '../../../models/Review';
import { GetReviewsService } from '../../../services/get-reviews.service';
import { StarRatingComponent } from '../../uiComponents/star-rating/star-rating.component';
import { PlaceUserCardComponent } from '../../uiComponents/place-user-card/place-user-card.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'brunch-place-reviews',
  imports: [StarRatingComponent, PlaceUserCardComponent],
  templateUrl: './place-reviews.component.html',
  styleUrl: './place-reviews.component.css'
})
export class PlaceReviewsComponent {

  @Input() placeId!:string;
  reviews!:Array<Review>;
  getReviewsServiceSubscription:Subscription = new Subscription(); 
  months:Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private getReviewsService: GetReviewsService, private router: Router) {
    this.subscribeToGetReviewsService();
  }

  ngOnDestroy() {
    this.getReviewsServiceSubscription.unsubscribe();
  }

  ngOnInit(){
    this.getReviewsService.getReviewsByPlaceId(this.placeId);
  }

  subscribeToGetReviewsService() {
    this.getReviewsServiceSubscription = this.getReviewsService.reviewsByPlaceId.subscribe((reviews:Array<Review>) => {
      this.reviews = reviews.sort((a,b) => {
       return +(new Date(b.reviewDate)) - +(new Date(a.reviewDate));
      });
    })
  }

  formatDate(s:string) {
    const d = new Date(s); 
    if(d.toString() == 'Invalid Date') return '';
    return `${this.months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  navigateToProfileFor(review:Review) {
    this.router.navigateByUrl(`/profile/${review.userName}`);
  }

}
