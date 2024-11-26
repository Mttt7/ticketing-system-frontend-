import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserProfile} from '../../models/UserProfile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = 'http://localhost:8080/api/v1/user';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.userUrl + '/all');
  }
}
