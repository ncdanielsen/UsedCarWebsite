import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdvertService } from '../_services/advert.service';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Advert } from '../_models/Advert';

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent implements OnInit {
  advertRegisterForm: FormGroup;
  advert: Advert;
  constructor(private advertService: AdvertService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.advertRegisterForm = this.fb.group({
      registerNumber: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      make: ['', Validators.required],
      model: ['', Validators.required]
    });
  }

  createAdvert() {
    if (this.advertRegisterForm.valid) {
      this.advert = Object.assign({}, this.advertRegisterForm.value);
      this.advertService.createAdvert(this.advert).subscribe((data: Advert) => this.advert = {
        id: data.id,
        userId: data.userId,
        registerNumber: data.registerNumber
      }, error => {
        console.log(error);
      }, () => {
        this.router.navigate(['/adverts/edit/' + this.advert.id]);
      });
    }
  }
}
