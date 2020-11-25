import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  fg: FormGroup;
  public result: any;

  constructor(
    private s: AuthService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.fg = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      UserName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      PasswordConfirmation: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.fg.value.Password === this.fg.value.PasswordConfirmation) {
      this.s.register(this.fg.value)
        .subscribe(result => {
          this.result = result;
          this.router.navigate(['/login']);
        }, error => console.error(error));
    } else {
      this.result = 'Password do not match !';
    }
  }
}
