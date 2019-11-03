import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListCarsComponent } from './adverts/list-cars/list-cars.component';
import { NewAdComponent } from './new-ad/new-ad.component';
import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdvertDetailComponent } from './adverts/advert-detail/advert-detail.component';
import { AdvertDetailResolver } from './_resolver/advert-detail.resolver';
import { ListCarsResolver } from './_resolver/list-cars.resolver';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'adverts', component: ListCarsComponent, resolve: {adverts: ListCarsResolver}},
    {path: 'adverts/:id', component: AdvertDetailComponent, resolve: {advert: AdvertDetailResolver}},
    {path: 'new-ad', component: NewAdComponent , canActivate: [AuthGuard]},
    {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
