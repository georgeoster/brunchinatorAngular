import { Component, Input } from '@angular/core';
import { autoCompletePlace, Review, User } from '../../../utils/types/all.types';
import { StarRatingComponent } from '../../uiComponents/star-rating/star-rating.component';
import { CardComponent } from '../../uiComponents/card/card.component';
import { ButtonComponent } from '../../uiComponents/button/button.component';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AddReviewService } from '../../../services/add-review.service';

@Component({
  selector: 'app-review-place',
  imports: [CardComponent, StarRatingComponent, ButtonComponent, FormsModule],
  templateUrl: './review-place.component.html',
  styleUrl: './review-place.component.css'
})
export class ReviewPlaceComponent {

  @Input() place!: autoCompletePlace;
  mainImageSrc:string = '';
  review:Review = {
    placeId: '',
    userName: '',
    placeName: '',
    burger: 0,
    bloody: 0,
    words: '',
    reviewDate: new Date().toLocaleDateString(),
  }
  userSubscription: Subscription = new Subscription;

  constructor(private userService: UserService, private addReviewService: AddReviewService) {
    this.subscribeToUser();
  }

  subscribeToUser(){
    this.userSubscription = this.userService.user.subscribe((user: User) => {
      this.review.userName = user.userName;
    });
  }

  ngOnInit(){
    this.populateMainImageSrc()
  }
    
  populateMainImageSrc() {
    this.mainImageSrc = this.place?.photos?.[0]?.getUrl({'maxWidth': 600, 'maxHeight': 600});
    this.review.placeId = this.place?.place_id;
    this.review.placeName = this.place?.name;
  }

  handleRating(e:number, field:string) {
    if(field === 'burger') this.review.burger = e;
    if(field === 'bloody') this.review.bloody = e;
  }

  handlePostReview(){
    this.addReviewService.addReview(this.review);
  }
}
