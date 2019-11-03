import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';

import {Advert} from '../_models/Advert';
import { AdvertService } from '../_services/advert.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListCarsResolver implements Resolve<Advert[]> {

    constructor(private advertService: AdvertService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Advert[]> {
        return this.advertService.getAdverts().pipe(
            catchError(error => {
                console.log('Failed to retrieve data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
