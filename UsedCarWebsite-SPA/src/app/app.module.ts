import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ListCarsComponent } from './adverts/list-cars/list-cars.component';
import { MessagesComponent } from './messages/messages.component';
import { NewAdComponent } from './new-ad/new-ad.component';
import { appRoutes } from './routes';
import { LoginComponent } from './login/login.component';
import { AdvertCardComponent } from './adverts/advert-card/advert-card.component';
import { AdvertDetailComponent } from './adverts/advert-detail/advert-detail.component';
import { AdvertService } from './_services/advert.service';
import { AdvertDetailResolver } from './_resolver/advert-detail.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { ListCarsResolver } from './_resolver/list-cars.resolver';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserProfileResolver } from './_resolver/user-profile.resolver';
import { UserDetailResolver } from './_resolver/user-detail.resolver';
import { CompactAdvertCardComponent } from './adverts/compact-advert-card/compact-advert-card.component';
import { AdvertEditComponent } from './adverts/advert-edit/advert-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export function tokenGetter() {
   return localStorage.getItem('token');
}

/**
 * Fix for ngx-gallery issues in angular 8
 */
export class CustomHammerConfig extends HammerGestureConfig {
   overrides = {
      pinch: { enable: false },
      rotate: { enable: false}
   };
}


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListCarsComponent,
      MessagesComponent,
      NewAdComponent,
      LoginComponent,
      AdvertCardComponent,
      AdvertDetailComponent,
      UserDetailComponent,
      UserEditComponent,
      UserProfileComponent,
      CompactAdvertCardComponent,
      AdvertEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      TabsModule.forRoot(),
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AdvertService,
      AuthGuard,
      PreventUnsavedChanges,
      AdvertDetailResolver,
      ListCarsResolver,
      UserProfileResolver,
      UserDetailResolver,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
