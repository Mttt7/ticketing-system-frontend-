import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() {
  }

  convertToNotificationNiceName(type: string, contentId: number) {
    switch (type) {
      case 'NEW_DEPARTMENT_ASSIGNED':
        return 'You have been assigned to new department #' + contentId;
      case 'DEPARTMENT_REMOVED':
        return 'Your department has been removed #' + contentId;
      case 'NEW_TICKET_ASSIGNED':
        return 'You have been assigned to ticket  #' + contentId;
      case 'NEW_COMMENT_ON_FOLLOWED_TICKET':
        return 'Someone commented on ticket you are following #' + contentId;
      case 'NEW_USER_ON_DEPARTMENT':
        return 'New user on your department #' + contentId;
      case 'FOLLOWED_TICKET_CLOSED':
        return 'Followed ticket closed #' + contentId;
      case 'ACTION_NEEDED_TIME':
        return 'Action needed #' + contentId;
      default:
        return type;
    }
  }

  convertToNiceDate(date: Date) {
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
}
