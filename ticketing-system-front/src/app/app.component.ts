import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from './services/api/auth.service';
import {NotificationHelperService} from "./services/helpers/notification.helper.service";
import {WebsocketService} from "./services/helpers/websocket.service";
import {toast} from "ngx-sonner";
import {ConverterService} from "./services/helpers/converter.service";
import {UserProfile} from "./models/UserProfile";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'realestateapp';
  id: string = '';
  user: UserProfile = {} as UserProfile;
  unreadNotifications: string = '0';
  userLoggedIn: boolean = false;

  constructor(private authService: AuthService,
              private notificationHelperService: NotificationHelperService, private webSocketService: WebsocketService,
              private converterService: ConverterService, private router: Router, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.authService.$userLoggedIn.subscribe({
      next: () => {
        this.userLoggedIn = true;
        this.getId();
        this.cdRef.detectChanges();
      }
    })
    this.authService.$userLogOut.subscribe({
      next: () => {
        this.userLoggedIn = false;
        this.user = {} as UserProfile;
        this.id = '';
        this.cdRef.detectChanges();
      }
    })

    this.authService.validateJwtToken().subscribe({
      next: (data) => {
        this.userLoggedIn = true
        this.getId();
      },
      error: (error) => {
        this.router.navigateByUrl('/login');
        return;
      }
    })

  }

  getId() {
    if (this.userLoggedIn) {
      this.id = this.authService.getLoggedInUserId()!;
      this.user = this.authService.getLoggedInUser();
      this.notificationHelperService.$unreadNotifications.subscribe({
        next: (data) => {
          this.unreadNotifications = data > 99 ? "99+" : `${data}`;
        }
      });
      this.webSocketService.connect(() => {
        this.webSocketService.subscribeToUserNotifications((message) => {
          toast.info(this.converterService.convertToNotificationNiceName(message.type, message.contentId));
          this.notificationHelperService.$unreadNotifications.next(this.notificationHelperService.$unreadNotifications.value + 1);
          this.webSocketService.$newNotification.next(message);
        });
      });


    } else {
      this.id = '';
    }
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }
}
