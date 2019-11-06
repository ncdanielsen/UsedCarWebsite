import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class UserDetailResolver implements Resolve<User> {

    constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                console.log('Failed to retrieve your data');
                console.log(route.params.id);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
