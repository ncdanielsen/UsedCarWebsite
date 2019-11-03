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

}
