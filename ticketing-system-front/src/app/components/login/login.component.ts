import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {LoginRequestPayload} from '../../models/LoginRequestPayload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  credentialsFormGroup!: FormGroup;
  invalidCredentials: boolean = false;
  newAccount: boolean = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  credentials: LoginRequestPayload = {
    email: '',
    password: '',
  };

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('registered') === 'true') {
        this.newAccount = true;
      } else {
        this.newAccount = false;
      }
    });
  }

  onPasswordChange($event: Event) {
    this.credentials.password = ($event.target as any).value;
  }

  onEmailChange($event: Event) {
    this.credentials.email = ($event.target as any).value;
  }

  login() {
    this.authService.login(this.credentials).subscribe(
      (data) => {
        this.authService.setToken(data);
        this.loading = false;
        data.user.id
      },
      (error) => {
        this.loading = false;
        if (error.status == 401) {
          this.invalidCredentials = true;
        }
      }
    );
  }
}
