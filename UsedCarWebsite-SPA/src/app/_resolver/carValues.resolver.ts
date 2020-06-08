import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CarValues } from '../_models/CarValues';
import { ValueService } from '../_services/value.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CarValueResolver implements Resolve<CarValues> {
    constructor(private valueService: ValueService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<CarValues> {
        return this.valueService.getCarValues().pipe(
            catchError(error => {
                console.log('Failed to retrieve data');
                this.router.navigate(['/adverts']);
                return of(null);
            }));
    }
}
