import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';

import {Advert} from '../_models/Advert';
import { AdvertService } from '../_services/advert.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AdvertDetailResolver implements Resolve<Advert>{

    constructor(private advertService: AdvertService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Advert> {
        return this.advertService.getAdvert(route.params.id).pipe(
            catchError(error => {
                console.log('Failed to retrieve data');
                this.router.navigate(['/adverts']);
                return of(null);
            })
        );
    }
}