import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { EditReviewComponent } from './components/edit-review/edit-review.component';
import { PlaceComponent } from './components/place/place.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { ViewReviewsComponent } from './components/view-reviews/view-reviews.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'addReview', component: AddReviewComponent },
  { path: 'editReview', component: EditReviewComponent },
  { path: 'place', component: PlaceComponent },
  { path: 'profile/:userName', component: ProfileComponent },
  { path: 'viewReviews', component: ViewReviewsComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];
