import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NotificationsResponseDto} from "../../models/NotificationsResponseDto";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationUrl = 'http://localhost:8080/api/v1/notification';

  constructor(private http: HttpClient) {
  }

  getAllNotifications(pageNumber: number, onlyUnread: boolean): Observable<NotificationsResponseDto> {
    return this.http.get<NotificationsResponseDto>(this.notificationUrl + '/all?pageNumber=' + pageNumber + '&pageSize=10' + '&onlyUnread=' + onlyUnread);
  }

  countUnreadNotifications(): Observable<number> {
    return this.http.get<number>(this.notificationUrl + '/count-unread');
  }

  markAsRead(id: number) {
    return this.http.post(this.notificationUrl + `/mark-as-read/${id}`, {});
  }
}
