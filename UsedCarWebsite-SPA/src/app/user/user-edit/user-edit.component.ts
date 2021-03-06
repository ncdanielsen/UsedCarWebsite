import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Advert } from 'src/app/_models/Advert';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  user: User;
  adverts: Advert[];

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private userService: UserService, private route: ActivatedRoute, private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    this.adverts = this.user.adverts;
  }

  updateUser() {
    this.userService.updateUser(this.authservice.decodedToken.nameid, this.user).subscribe(next => {
      this.editForm.reset(this.user);
      console.log('Saved changes');
    }, error => {
      console.log('Failed to save changes');
    });
  }

  navigateToAdvert(id: number) {
    this.router.navigate(['/adverts/' + id]);
  }
}
