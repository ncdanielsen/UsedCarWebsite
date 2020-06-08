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
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDetailResolver } from './_resolver/user-detail.resolver';
import { AdvertEditComponent } from './adverts/advert-edit/advert-edit.component';
import { UserPreventUnsavedChanges } from './_guards/user-prevent-unsaved-changes.guard';
import { AdvertPreventUnsavedChanges } from './_guards/advert-prevent-unsaved-changes.guard';
import { CarValueResolver } from './_resolver/carValues.resolver';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'user', component: UserEditComponent,
            resolve: {user: UserDetailResolver}, canDeactivate: [UserPreventUnsavedChanges]},
            {path: 'adverts/edit/:id', component: AdvertEditComponent, resolve: {advert: AdvertDetailResolver, carValues: CarValueResolver},
            canDeactivate: [AdvertPreventUnsavedChanges]},
            {path: 'new-ad', component: NewAdComponent},
            {path: 'messages', component: MessagesComponent},
        ]
    },
    {path: 'adverts', component: ListCarsComponent, resolve: {adverts: ListCarsResolver, carValues: CarValueResolver}},
    {path: 'adverts/:id', component: AdvertDetailComponent, resolve: {advert: AdvertDetailResolver}},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
