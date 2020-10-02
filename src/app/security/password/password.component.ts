import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {LoggedInUser} from '../../common/classes/user';
import {HelperService} from '../../common/_helper/helper';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  userKey = 'current-user';
  fg: FormGroup;
  private formSubmitAttempt: boolean;
  returnUrl: string;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private helper: HelperService,
    private authService: AuthService) {

    try {
      const data = JSON.parse(sessionStorage.getItem(this.userKey));
      const user: LoggedInUser = new LoggedInUser();
      user.clone(data);
      this.authService.changeCurrentUserSubject(user);
    } catch (ex) {
      console.error(ex);
    }

    if (this.authService.currentUserValue &&
      !this.helper.isEmpty(this.authService.currentUserValue)) {
      this.router.navigate(['/demo']).then().catch();
    }
  }

  ngOnInit() {
    this.fg = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.fg.valid) {
      if (this.fg.value.Username !== '' && this.fg.value.Password !== '') {
        this.authService.login(this.fg.value)
          .pipe(first())
          .subscribe(
            data => {
              const user: LoggedInUser = new LoggedInUser();
              user.clone(data);
              sessionStorage.setItem(this.userKey, JSON.stringify(user));
              this.authService.changeCurrentUserSubject(user);
              if (this.returnUrl) {
                this.router.navigate([this.returnUrl]).then().catch();
              } else {
                this.router.navigate(['/login']).then().catch();
              }
            },
            error => {
              console.log(error);
              this.error = error;
            });
      }
    }

    this.formSubmitAttempt = true;
  }
}
