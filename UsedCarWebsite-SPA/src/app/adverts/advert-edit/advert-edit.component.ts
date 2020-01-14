import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advert } from 'src/app/_models/Advert';
import { AdvertService } from 'src/app/_services/advert.service';
import { NgForm, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-advert-edit',
  templateUrl: './advert-edit.component.html',
  styleUrls: ['./advert-edit.component.css']
})
export class AdvertEditComponent implements OnInit {
  @ViewChild('advertEditForm', {static: true}) advertEditForm: NgForm;
  advert: Advert;

  transmissionList = [{value: 'manual', display: 'Manual'}, {value: 'automatic', display: 'Automatic'}];
  driveList = [{value: 'fwd', display: 'FWD'}, {value: 'rwd', display: 'RWD'},
               {value: 'awd', display: 'AWD'}];
  fuelList = [{value: 'petrol', display: 'Petrol'}, {value: 'diesel', display: 'Diesel'},
              {value: 'electric', display: 'Electric'}];
  colourList = [{value: 'blue', display: 'Blue'}, {value: 'grey', display: 'Grey'},
                {value: 'red', display: 'Red'}, {value: 'white', display: 'White'},
                {value: 'black', display: 'Black'}, {value: 'silver', display: 'Silver'},
                {value: 'other', display: 'Other'}];
  bodyStyleList = [{value: 'coupe', display: 'Coupe'}, {value: 'sedan', display: 'Sedan'},
                  {value: 'hatchback', display: 'Hatchback'}, {value: 'suv', display: 'SUV'},
                  {value: 'wagon', display: 'Wagon'}, {value: 'convertible', display: 'Convertible'},
                  {value: 'other', display: 'Other'}];

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.advertEditForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private advertService: AdvertService, private authService: AuthService,
              private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

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



  makeAdvertPublic() {
    if (this.advertEditForm.valid) {
      this.updateAdvert();
      this.advertService.changeAdvertStatus(this.advert.id).subscribe(next => {
        this.router.navigate(['/adverts/' + this.advert.id]);
      }, error => {
        console.log(error);
      });
    }
  }
}
