import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { autoCompletePlace, CreateReview, Review, serviceError, User } from '../../../utils/types/all.types';
import { StarRatingComponent } from '../../uiComponents/star-rating/star-rating.component';
import { CardComponent } from '../../uiComponents/card/card.component';
import { ButtonComponent } from '../../uiComponents/button/button.component';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AddReviewService } from '../../../services/add-review.service';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from '../../uiComponents/error-message/error-message.component';
import { getImageForPlace } from '../../../utils/placeUtils';

@Component({
  selector: 'app-review-place',
  imports: [CardComponent, StarRatingComponent, ButtonComponent, ErrorMessageComponent, FormsModule],
  templateUrl: './review-place.component.html',
  styleUrl: './review-place.component.css'
})
export class ReviewPlaceComponent {

  @Input() place!: autoCompletePlace;
  mainImageSrc:string = '';
  review:CreateReview = {
    placeId: '',
    userName: '',
    placeName: '',
    vicinity: '',
    burger: null,
    bloody: null,
    words: '',
    reviewDate: new Date().toLocaleDateString(),
  }
  userSubscription: Subscription = new Subscription;
  successfullyAddedReviewSubscription: Subscription = new Subscription;
  addReviewErrorSubscription: Subscription = new Subscription;
  noReviewError:boolean = false;
  addReviewError:boolean = false;
  errorMessage:string = 'Something went wrong. Please try again later.'

  stars = [
    { title: 'Burger', field: 'burger' },
    { title: 'Bloody', field: 'bloody' }
  ]

  constructor(private userService: UserService, private addReviewService: AddReviewService, private changeDetectorRef: ChangeDetectorRef, private router: Router) {
    this.subscribeToUser();
    this.subscribeTosuccessfullyAddedReview();
    this.subscribeToAddReviewError();
  }

  subscribeToUser(){
    this.userSubscription = this.userService.user.subscribe((user: User) => {
      this.review.userName = user?.userName;
    });
  }

  subscribeTosuccessfullyAddedReview() {
    this.successfullyAddedReviewSubscription = this.addReviewService.successfullyAddedReview.subscribe((success:boolean) => {
      if (success) {
        this.router.navigate(['home']);
      }
    });
  }

  subscribeToAddReviewError() {
    this.addReviewErrorSubscription = this.addReviewService.addReviewError.subscribe((error:serviceError) => {
      this.addReviewError = true;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit(){
    this.populateMainImageSrc()
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.successfullyAddedReviewSubscription.unsubscribe();
    this.addReviewErrorSubscription.unsubscribe();
  }
    
  populateMainImageSrc() {
    this.mainImageSrc = getImageForPlace(this.place);
    this.review.placeId = this.place?.place_id;
    this.review.placeName = this.place?.name;
    this.review.vicinity = this.place?.vicinity;
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
