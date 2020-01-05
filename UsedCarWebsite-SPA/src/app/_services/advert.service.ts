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

getAdverts(page?, itemsPerPage?): Observable<PaginatedResult<Advert[]>> {
  const paginatedResult: PaginatedResult<Advert[]> = new PaginatedResult<Advert[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null){
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
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
