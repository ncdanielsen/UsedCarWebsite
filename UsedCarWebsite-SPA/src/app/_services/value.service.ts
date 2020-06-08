import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Colour } from '../_models/Colour';
import { Transmission } from '../_models/Transmission';
import { DriveType } from '../_models/DriveType';
import { FuelType } from '../_models/FuelType';
import { CarValues } from '../_models/CarValues';
import { BodyStyle } from '../_models/BodyStyle';



@Injectable({
  providedIn: 'root'
})
export class ValueService {

baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
/*
getColours(): Observable<Colour[]> {
  return this.http.get<Colour[]>(this.baseUrl + 'value/Colour');
}*/

getColours(): Observable<Colour[]> {
  return this.http.get<Colour[]>(this.baseUrl + 'value/Colour');
}

getTransmissions(): Observable<Transmission[]> {
  return this.http.get<Transmission[]>(this.baseUrl + 'value/Transmission');
}

getDriveType(): Observable<DriveType[]> {
  return this.http.get<DriveType[]>(this.baseUrl + 'value/DriveTypes');
}

getFuelTypes(): Observable<FuelType[]> {
  return this.http.get<FuelType[]>(this.baseUrl + 'value/FuelTypes');
}

getBodyStyles(): Observable<BodyStyle[]> {
  return this.http.get<BodyStyle[]>(this.baseUrl + 'value/BodyStyle');
}

getCarValues(): Observable<CarValues> {
  return this.http.get<CarValues>(this.baseUrl + 'value/CarValues');
}
}
