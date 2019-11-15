import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advert } from '../_models/Advert';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getAdverts(): Observable<Advert[]> {
  return this.http.get<Advert[]>(this.baseUrl + 'posts/');
}

getAdvert(id): Observable<Advert> {
  return this.http.get<Advert>(this.baseUrl + 'posts/' + id);
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
}
