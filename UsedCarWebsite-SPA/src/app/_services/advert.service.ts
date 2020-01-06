import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advert } from '../_models/Advert';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getAdverts(page?, itemsPerPage?, advertParams?): Observable<PaginatedResult<Advert[]>> {
  const paginatedResult: PaginatedResult<Advert[]> = new PaginatedResult<Advert[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (advertParams != null) {
    params = params.append('make', advertParams.make);
    params = params.append('model', advertParams.model);
    params = params.append('transmissionType', advertParams.transmissionType);
    params = params.append('driveType', advertParams.driveType);
    params = params.append('fuelType', advertParams.fuelType);
    params = params.append('colour', advertParams.colour);
    params = params.append('bodyStyle', advertParams.bodyStyle);
    params = params.append('minPrice', advertParams.minPrice);
    params = params.append('maxPrice', advertParams.maxPrice);
    params = params.append('minModelYear', advertParams.minModelYear);
    params = params.append('maxModelYear', advertParams.maxModelYear);
    params = params.append('minHorsePower', advertParams.minHorsePower);
    params = params.append('maxHorsePower', advertParams.maxHorsePower);
    params = params.append('minMileage', advertParams.minMileage);
    params = params.append('maxMileage', advertParams.maxMileage);
    params = params.append('minSeatNumber', advertParams.minSeatNumber);
    params = params.append('maxSeatNumber', advertParams.maxSeatNumber);
    params = params.append('minWeight', advertParams.minWeight);
    params = params.append('maxWeight', advertParams.maxWeight);
  }

  return this.http.get<Advert[]>(this.baseUrl + 'posts/', {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

getAdvert(id): Observable<Advert> {
  return this.http.get<Advert>(this.baseUrl + 'posts/' + id);
}

createAdvert(advert: Advert) {
  return this.http.post(this.baseUrl + 'posts', advert);
}

updateAdvert(id: number, advert: Advert) {
  return this.http.put(this.baseUrl + 'posts/' + id, advert);
}

setMainPhoto(advertId: number, photoId: number) {
  return this.http.post(this.baseUrl + 'photos/' + advertId + '/' + photoId + '/setMain', {});
}

deletePhoto(advertId: number, photoId: number) {
  return this.http.delete(this.baseUrl + 'photos/' + advertId + '/' + photoId);
}

changeAdvertStatus(advertId: number) {
  return this.http.post(this.baseUrl + 'posts/' + advertId + '/changeStatus', {});
}

}
