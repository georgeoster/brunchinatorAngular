import { Component } from '@angular/core';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';



@Component({
  selector: 'brunch-profile',
  imports: [ProfilePictureComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(){}

}
