import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Channel} from "../models/Channel";
import {Priority} from "../models/Priority";

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  private baseUrl = 'http://localhost:8080/api/v1/enum'; // zmień na swój URL

  constructor(private http: HttpClient) {
  }

  getChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(`${this.baseUrl}/channels`);
  }

  getPriorities(): Observable<Priority[]> {
    return this.http.get<Priority[]>(`${this.baseUrl}/priorities`);
  }
}
