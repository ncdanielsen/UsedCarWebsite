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
  advertParams: any = {};

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

  constructor(private advertService: AdvertService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.adverts = data.adverts.result;
      this.pagination = data.adverts.pagination;
    });

    this.advertParams.make = '';
    this.advertParams.model = '';
    this.advertParams.transmissionType = '';
    this.advertParams.driveType = '';
    this.advertParams.fuelType = '';
    this.advertParams.colour = '';
    this.advertParams.bodyStyle = '';
    this.advertParams.minPrice = 0;
    this.advertParams.maxPrice = 10000000;
    this.advertParams.minModelYear = 1900;
    this.advertParams.maxModelYear = 2020;
    this.advertParams.minHorsePower = 0;
    this.advertParams.maxHorsePower = 3000;
    this.advertParams.minMileage = 0;
    this.advertParams.maxMileage = 20000000;
    this.advertParams.minSeatNumber = 1;
    this.advertParams.maxSeatNumber = 50;
    this.advertParams.minWeight = 0;
    this.advertParams.maxWeight = 100000;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAdverts();
  }

  resetFilters() {
    this.advertParams.make = '';
    this.advertParams.model = '';
    this.advertParams.transmissionType = '';
    this.advertParams.driveType = '';
    this.advertParams.fuelType = '';
    this.advertParams.colour = '';
    this.advertParams.bodyStyle = '';
    this.advertParams.minPrice = 0;
    this.advertParams.maxPrice = 10000000;
    this.advertParams.minModelYear = 1900;
    this.advertParams.maxModelYear = 100000;
    this.advertParams.minHorsePower = 0;
    this.advertParams.maxHorsePower = 3000;
    this.advertParams.minMileage = 0;
    this.advertParams.maxMileage = 20000000;
    this.advertParams.minSeatNumber = 1;
    this.advertParams.maxSeatNumber = 50;
    this.advertParams.minWeight = 0;
    this.advertParams.maxWeight = 100000;

    this.loadAdverts();
  }

  loadAdverts() {
    this.advertService
    .getAdverts(this.pagination.currentPage, this.pagination.itemsPerPage, this.advertParams)
    .subscribe((res: PaginatedResult<Advert[]>) => {
      this.adverts = res.result;
      this.pagination = res.pagination;
    }, error => {
      console.log(error);
    });
  }
}
