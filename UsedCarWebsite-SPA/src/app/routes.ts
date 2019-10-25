import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListCarsComponent } from './list-cars/list-cars.component';
import { NewAdComponent } from './new-ad/new-ad.component';
import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'list-cars', component: ListCarsComponent},
    {path: 'new-ad', component: NewAdComponent , canActivate: [AuthGuard]},
    {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
