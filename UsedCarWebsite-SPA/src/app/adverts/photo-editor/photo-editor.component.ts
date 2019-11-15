import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/Photo';
import { environment } from '../../../environments/environment';
import { AdvertService } from 'src/app/_services/advert.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Input() advertId: number;

  uploader: FileUploader;
  baseUrl = environment.apiUrl;
  hasBaseDropZoneOver: boolean;
  response: string;

  currentMainPhoto: Photo;

  constructor(private advertService: AdvertService) {
  }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'photos/' + this.advertId,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: true,
      removeAfterUpload: true
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.hasBaseDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe( res => this.response = res );

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.advertService.setMainPhoto(this.advertId, photo.id).subscribe(() => {
      this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
      this.currentMainPhoto.isMain = false;
      photo.isMain = true;
      console.log('Success set photo to main');
    }, error => {
      console.log(error);
    });
  }

  deletePhoto(photoId: number) {
    if (confirm('Are you sure you want to delete this photo?')) {
      this.advertService.deletePhoto(this.advertId, photoId).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
        console.log('Photo has been deleted');
      }, error => {
        console.log('Failed to delete the photo');
      })
    }
  }
}
