import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';

@Injectable()
export class UserProfileResolver implements Resolve<User> {

    constructor(private userService: UserService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params.id).pipe(
            catchError(error => {
                console.log('Failed to retrieve data');
                console.log(route.params.id);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
