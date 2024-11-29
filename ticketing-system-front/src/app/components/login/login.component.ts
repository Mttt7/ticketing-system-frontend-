import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../services/api/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
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
    private authService: AuthService,
    private router: Router
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
        this.authService.setToken(data.accessToken);
        this.authService.setSelfId(data.user.id);
        this.authService.setUser(data.user);
        this.loading = false;
        this.authService.$userLoggedIn.next(null);
        this.router.navigate(['/dashboard']);
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
