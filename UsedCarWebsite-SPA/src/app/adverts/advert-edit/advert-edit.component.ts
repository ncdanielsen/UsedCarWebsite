import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Advert } from 'src/app/_models/Advert';
import { AdvertService } from 'src/app/_services/advert.service';
import { NgForm } from '@angular/forms';

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

  constructor(private advertService: AdvertService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.advert = data.advert;
    });
  }

  updateAdvert() {
    this.advertService.updateAdvert(this.advert.id, this.advert).subscribe(next => {
      this.advertEditForm.reset(this.advert);
      console.log('Saved Changes');
    }, error => {
      console.log('Failed to save changes to advert');
    });
  }
}
