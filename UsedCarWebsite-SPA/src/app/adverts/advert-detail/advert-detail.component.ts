import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advert } from 'src/app/_models/Advert';
import { AdvertService } from 'src/app/_services/advert.service';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.css']
})
export class AdvertDetailComponent implements OnInit {
  advert: Advert;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private advertService: AdvertService, private authService: AuthService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.advert = data.advert;
    });

    this.galleryOptions = [
      {
        width: '900px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    if (this.advert.photos.length > 0) {
      for (const photo of this.advert.photos) {
        imageUrls.push({
          small: photo.url,
          medium: photo.url,
          big: photo.url,
          description: photo.description
        });
      }
    } else {
      imageUrls.push({
        small: 'https://res.cloudinary.com/ekddjmgn6hh/image/upload/v1579024930/tj9jxtcjakmcyfdb733q_wxkvv2.png',
        medium: 'https://res.cloudinary.com/ekddjmgn6hh/image/upload/v1579024930/tj9jxtcjakmcyfdb733q_wxkvv2.png',
        big: 'https://res.cloudinary.com/ekddjmgn6hh/image/upload/v1579024930/tj9jxtcjakmcyfdb733q_wxkvv2.png'
      });
    }
    return imageUrls;
  }


  editAdvert() {
    this.router.navigate(['/adverts/edit/' + this.advert.id]);
  }

  getAdvertStatus() {
    return this.advert.advertStatus.toLowerCase();
  }

  isOwner() {
    // tslint:disable-next-line: triple-equals
    return this.advert.userId == this.authService.currentUser();
  }

  isActive() {
    return this.advert.advertStatus.toLowerCase() === 'active';
  }

  isExpired() {
    return this.advert.advertStatus.toLowerCase() === 'expired';
  }

  changeStatus() {
    this.advertService.changeAdvertStatus(this.advert.id).subscribe(() => {
      console.log('Saved Changes');
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

  getPhotoStatus() {
    return this.advert.photos.length > 0;
  }
}
