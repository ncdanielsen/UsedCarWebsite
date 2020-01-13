import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

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
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserProfileResolver } from './_resolver/user-profile.resolver';
import { UserDetailResolver } from './_resolver/user-detail.resolver';
import { CompactAdvertCardComponent } from './adverts/compact-advert-card/compact-advert-card.component';
import { AdvertEditComponent } from './adverts/advert-edit/advert-edit.component';
import { UserPreventUnsavedChanges} from './_guards/user-prevent-unsaved-changes.guard';
import { AdvertPreventUnsavedChanges } from './_guards/advert-prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './adverts/photo-editor/photo-editor.component';

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
      UserEditComponent,
      CompactAdvertCardComponent,
      AdvertEditComponent,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      TabsModule.forRoot(),
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
      PaginationModule.forRoot(),
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
      UserPreventUnsavedChanges,
      AdvertPreventUnsavedChanges,
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
