import {Component, OnInit} from '@angular/core';
import {LoggedInUser} from '../../classes/user';
import {AuthService} from '../../../security/service/auth.service';

@Component({
  selector: 'app-user-avatar-menu',
  templateUrl: './user-avatar-menu.component.html',
  styleUrls: ['./user-avatar-menu.component.css']
})
export class UserAvatarMenuComponent implements OnInit {

  public loggedInUser: LoggedInUser = new LoggedInUser();

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(value => {
      this.loggedInUser = value;
    });
  }

}
