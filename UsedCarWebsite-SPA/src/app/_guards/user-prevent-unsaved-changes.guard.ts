import {Injectable} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UserEditComponent } from '../user/user-edit/user-edit.component';

@Injectable()
export class UserPreventUnsavedChanges implements CanDeactivate<UserEditComponent> {
    canDeactivate(component: UserEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Any unsaved changes will be lost. Are you sure you want to continue?');
        }
        return true;
    }
}
