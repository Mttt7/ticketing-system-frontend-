import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, Subject} from 'rxjs';
import {LoginResponsePayload} from '../../models/LoginResponsePayload';
import {LoginRequestPayload} from '../../models/LoginRequestPayload';
import {HttpClient} from '@angular/common/http';
import {RegisterRequestPayload} from '../../models/RegisterRequestPayload';
import {Router} from '@angular/router';
import {UserProfile} from "../../models/UserProfile";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/v1/auth';
  $userLoggedIn = new Subject<null>();
  $userLogOut = new Subject<null>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getLoggedInUserId(): string | null {
    return localStorage.getItem('userId');
  }

  login(credentials: LoginRequestPayload): Observable<LoginResponsePayload> {
    return this.http.post<LoginResponsePayload>(
      this.authUrl + '/login',
      credentials
    );
  }

  register(registerPayload: RegisterRequestPayload): Observable<any> {
    return this.http.post(this.authUrl + '/register', registerPayload);
  }

  checkUsernameAvailability(username: string): Observable<ExistsResponse> {
    return this.http.get<ExistsResponse>(
      this.authUrl + '/username/' + username
    );
  }

  setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    this.$userLogOut.next(null);
  }

  userIsLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return of(false);
    }
    return this.validateJwtToken().pipe(
      map((response) => response.valid),
      catchError(() => of(false))
    );
  }

  setSelfId(id: number) {
    localStorage.setItem('userId', id.toString());
  }

  setUser(user: UserProfile) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  validateJwtToken(): Observable<{ valid: boolean }> {
    const token = localStorage.getItem('jwtToken');
    return this.http.post<{ valid: boolean }>(`${this.authUrl}/validate-jwt`, {jwt: token});
  }
}

interface ExistsResponse {
  available: boolean;
}
