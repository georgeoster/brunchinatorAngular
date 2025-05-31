import { Component, Input } from '@angular/core';
import { s3Host } from '../../../utils/http/consts';

@Component({
  selector: 'brunch-place-user-card',
  templateUrl: './place-user-card.component.html',
})
export class PlaceUserCardComponent {
  profilePicture: string = '/defaultProfile.jpg';
  private _userName: string = '';

  @Input()
  set userName(name: string) {
    this._userName = name;
    this.populateMainImageSrc();
  }

  get userName() {
    return this._userName;
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
