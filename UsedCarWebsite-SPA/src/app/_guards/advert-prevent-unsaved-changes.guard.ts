import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AdvertEditComponent } from '../adverts/advert-edit/advert-edit.component';

@Injectable()
export class AdvertPreventUnsavedChanges implements CanDeactivate<AdvertEditComponent> {
    canDeactivate(component: AdvertEditComponent) {
        if (component.advertEditForm.dirty) {
            return confirm('Any unsaved changes will be lost. Are you sure you want to continue?');
        }
        return true;
    }
}