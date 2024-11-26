import {Component} from '@angular/core';
import {AuthService} from './services/api/auth.service';
import {NotificationService} from "./services/api/notification.service";
import {NotificationHelperService} from "./services/helpers/notification.helper.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'realestateapp';
  id: string = '';
  unreadNotifications: string = '0';

  constructor(private authService: AuthService, private notificationService: NotificationService,
              private notificationHelperService: NotificationHelperService) {
  }

  ngOnInit(): void {
    if (this.userIsLoggedIn()) {
      this.id = this.authService.getLoggedInUserId()!;
      this.notificationHelperService.$unreadNotifications.subscribe({
        next: (data) => {
          console.log(data);
          this.unreadNotifications = data > 99 ? "99+" : `${data}`;
        }
      });
    } else {
      this.id = '';
    }
  }

  userIsLoggedIn(): boolean {
    return this.authService.userIsLoggedIn();
  }
}
