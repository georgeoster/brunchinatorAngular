import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { autoCompletePlace, Review, User } from '../../../utils/types/all.types';
import { StarRatingComponent } from '../../uiComponents/star-rating/star-rating.component';
import { CardComponent } from '../../uiComponents/card/card.component';
import { ButtonComponent } from '../../uiComponents/button/button.component';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AddReviewService } from '../../../services/add-review.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-review-place',
  imports: [CardComponent, StarRatingComponent, ButtonComponent, FormsModule, NgFor, NgIf, NgClass],
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
    burger: null,
    bloody: null,
    words: '',
    reviewDate: new Date().toLocaleDateString(),
  }
  userSubscription: Subscription = new Subscription;
  noReviewError:boolean = false;

  stars = [
    { title: 'Burger', field: 'burger' },
    { title: 'Bloody', field: 'bloody' }
  ]

  constructor(private userService: UserService, private addReviewService: AddReviewService, private changeDetectorRef: ChangeDetectorRef) {
    this.subscribeToUser();
  }

  subscribeToUser(){
    this.userSubscription = this.userService.user.subscribe((user: User) => {
      this.review.userName = user?.userName;
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

  formIsInvalid() {
    return this.review.burger == null && this.review.bloody == null;
  }

  displayErrors() {
    this.noReviewError = true;
    this.changeDetectorRef.detectChanges();
  }

  handleRating(e:number, field:string) {
    if(field === 'burger') this.review.burger = e;
    if(field === 'bloody') this.review.bloody = e;
    this.noReviewError = false;
    if (this.formIsInvalid()) {
      this.displayErrors();
      return;
    }
  }

  handlePostReview(){
    this.noReviewError = false;
    if (this.formIsInvalid()) {
      this.displayErrors();
      return;
    }
    this.addReviewService.addReview(this.review);
  }
}
