import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdvertService } from '../_services/advert.service';
import { Advert } from '../_models/Advert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  advert: Advert;

  constructor(private http: HttpClient, private advertService: AdvertService) { }

  ngOnInit() {
  }

}
