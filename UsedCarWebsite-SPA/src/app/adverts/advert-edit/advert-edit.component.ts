import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advert } from 'src/app/_models/Advert';
import { AdvertService } from 'src/app/_services/advert.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-advert-edit',
  templateUrl: './advert-edit.component.html',
  styleUrls: ['./advert-edit.component.css']
})
export class AdvertEditComponent implements OnInit {
  @ViewChild('advertEditForm', {static: true}) advertEditForm: NgForm;
  advert: Advert;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.advertEditForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private advertService: AdvertService, private authService: AuthService, 
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.advert = data.advert;
    });
    // tslint:disable-next-line: triple-equals
    if (this.advert.userId != this.authService.currentUser() || this.advert.advertStatus.toLowerCase() === 'expired') {
      this.router.navigate(['/home']);
    }
  }

  updateAdvert() {
    this.advertService.updateAdvert(this.advert.id, this.advert).subscribe(next => {
      this.advertEditForm.reset(this.advert);
      console.log('Saved Changes');
    }, error => {
      console.log('Failed to save changes to advert');
    });
  }

  isActive() {
    return this.advert.advertStatus.toLowerCase() === 'active';
  }
}
