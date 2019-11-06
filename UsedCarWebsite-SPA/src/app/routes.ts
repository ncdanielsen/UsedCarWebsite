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
import { UserProfileResolver } from './_resolver/user-profile.resolver';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserDetailResolver } from './_resolver/user-detail.resolver';
import { AdvertEditComponent } from './adverts/advert-edit/advert-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'user', component: UserDetailComponent, resolve: {user: UserDetailResolver}},
            {path: 'user/edit', component: UserEditComponent,
            resolve: {user: UserDetailResolver}, canDeactivate: [PreventUnsavedChanges]},
            {path: 'adverts/edit/:id', component: AdvertEditComponent, resolve: {adverts: AdvertDetailResolver},
            canDeactivate: [PreventUnsavedChanges]},
            {path: 'new-ad', component: NewAdComponent},
            {path: 'messages', component: MessagesComponent},
        ]
    },
    {path: 'adverts', component: ListCarsComponent, resolve: {adverts: ListCarsResolver}},
    {path: 'adverts/:id', component: AdvertDetailComponent, resolve: {advert: AdvertDetailResolver}},
    {path: 'user/profile/:id', component: UserProfileComponent, resolve: {user: UserProfileResolver}},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
