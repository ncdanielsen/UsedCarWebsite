import { Component, OnInit, Input } from '@angular/core';
import { Advert } from 'src/app/_models/Advert';

@Component({
  selector: 'app-compact-advert-card',
  templateUrl: './compact-advert-card.component.html',
  styleUrls: ['./compact-advert-card.component.css']
})
export class CompactAdvertCardComponent implements OnInit {
  @Input() advert: Advert;

  constructor() { }

  ngOnInit() {
  }

}
