import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Advert } from '../../_models/Advert';
import { AdvertService } from '../../_services/advert.service';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {
  adverts: Advert[];
  pagination: Pagination;

  constructor(private advertService: AdvertService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.adverts = data.adverts.result;
      this.pagination = data.adverts.pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAdverts();
  }

  loadAdverts() {
    this.advertService
    .getAdverts(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<Advert[]>) => {
      this.adverts = res.result;
      this.pagination = res.pagination;
    }, error => {
      console.log(error);
    })
  }
}
