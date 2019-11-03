import { Component, OnInit, Input } from '@angular/core';
import { Advert } from 'src/app/_models/Advert';

@Component({
  selector: 'app-advert-card',
  templateUrl: './advert-card.component.html',
  styleUrls: ['./advert-card.component.css']
})
export class AdvertCardComponent implements OnInit {
  @Input() advert: Advert;

  constructor() { }

  ngOnInit() {
  }

}
