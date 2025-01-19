import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import { ProfileReviewsComponent } from "../profile-reviews/profile-reviews.component";



@Component({
  selector: 'brunch-profile',
  imports: [ProfilePictureComponent, ProfileReviewsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userName!:string;

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userName = params.get('userName') ?? '';
    });
  }

}
