import { Component, Input } from '@angular/core';
import { s3Host } from '../../../utils/http/consts';

@Component({
  selector: 'brunch-place-user-card',
  imports: [],
  templateUrl: './place-user-card.component.html',
  styleUrl: './place-user-card.component.css'
})
export class PlaceUserCardComponent {
  @Input() userName:string = 'Place';
  profilePicture!:String;

  ngOnInit() {
    this.populateMainImageSrc();
  }

  async populateMainImageSrc() {
    this.profilePicture = `${s3Host}/${this.userName}`;  
  }

  handleProfilePictureError(e:Event){
    if ((e.target as HTMLImageElement).src !== '/defaultProfile.jpg') {
      (e.target as HTMLImageElement).src = '/defaultProfile.jpg';
    }
    return;
  }
}
