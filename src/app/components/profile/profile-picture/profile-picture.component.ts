import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { UploadImageService } from '../../../services/upload-image.service';
import { s3Host } from '../../../utils/http/consts';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../uiComponents/button/button.component';

@Component({
  selector: 'brunch-profile-picture',
  imports: [ButtonComponent],
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.css'
})
export class ProfilePictureComponent {

  private _userName:string = '';
  @Input()
  set userName(name:string) {
    this._userName = name;
    this.profilePicture = `${s3Host}/${this._userName}`;
  }
  get userName() {
    return this._userName
  }

  imageToUpload!:File;
  @Input() profileIsSignedInUser:boolean = false;
  profilePicture!:String;
  loading:boolean = false;
  uploadImageServiceSubscription:Subscription = new Subscription();

  constructor(private uploadImageService: UploadImageService, private changeDetectorRef: ChangeDetectorRef){
  }

  ngOnInit() {
    this.profilePicture = `${s3Host}/${this.userName}`;
    this.subscribeToUploadImageService();
  }

  subscribeToUploadImageService(){
    this.uploadImageServiceSubscription = this.uploadImageService.uploadImageResponse.subscribe((response) => {
      //TODO force re-getting of image
      this.loading = false;
      this.profilePicture = '';
      this.changeDetectorRef.detectChanges();
      this.profilePicture = `${s3Host}/${this.userName}`;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.uploadImageServiceSubscription.unsubscribe();
  }

  handleProfilePictureError(e:Event){
    if ((e.target as HTMLImageElement).src !== '/defaultProfile.jpg') {
      (e.target as HTMLImageElement).src = '/defaultProfile.jpg';
    }
    return;
  }

  updateProfilePicture(){
    const toUpload = new FormData();
    toUpload.append('image', this.imageToUpload);
    toUpload.append('userName', this.userName);
    this.loading = true;
    this.uploadImageService.uploadImage(toUpload);
  }

  imageUploadHandler(e:any) {
    this.imageToUpload = e.target.files[0];
    this.updateProfilePicture();
  }
}
