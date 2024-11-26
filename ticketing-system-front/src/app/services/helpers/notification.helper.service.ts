import {Injectable} from '@angular/core';
import {Notification} from "../../models/Notification";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationHelperService {

  $unreadNotifications: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
  }

  getNavigation(notification: Notification): string {
    switch (notification.type) {
      case 'NEW_DEPARTMENT_ASSIGNED':
        return 'departments/' + notification.contentId;
      case 'DEPARTMENT_REMOVED':
        return 'departments/' + notification.contentId;
      case 'NEW_TICKET_ASSIGNED':
        return 'tickets/' + notification.contentId;
      case 'NEW_COMMENT_ON_FOLLOWED_TICKET':
        return 'tickets/' + notification.contentId;
      case 'NEW_USER_ON_DEPARTMENT':
        return 'departments/' + notification.contentId;
      case 'FOLLOWED_TICKET_CLOSED':
        return 'tickets/' + notification.contentId;
      case 'ACTION_NEEDED_TIME':
        return 'tickets/' + notification.contentId;
      default:
        return '';
    }
  }
}
