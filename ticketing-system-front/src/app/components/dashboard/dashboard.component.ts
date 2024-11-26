import {Component} from '@angular/core';
import {TicketService} from "../../services/api/ticket.service";
import {StatsDto} from "../../models/StatsDto";
import {NotificationService} from "../../services/api/notification.service";
import {Notification} from "../../models/Notification";
import {toast} from "ngx-sonner";
import {ConverterService} from "../../services/helpers/converter.service";
import {NotificationHelperService} from "../../services/helpers/notification.helper.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats!: StatsDto;
  pageNumber: number = 0;
  last: boolean = false;
  notifications: Notification[] = [];
  unreadNotifications: number = 0;
  onlyUnread: boolean = false;

  constructor(private ticketService: TicketService, private notificationService: NotificationService,
              private converterService: ConverterService, private notificationHelperService: NotificationHelperService,
              private router: Router) {
  }

  ngOnInit() {
    this.getStats();
    this.getNotifications();
    this.updateUnreadNotifications();
    this.notificationHelperService.$unreadNotifications.subscribe({
      next: (data) => {
        this.unreadNotifications = data;
      }
    });
  }


  getStats() {
    this.ticketService.getStats().subscribe({
      next: (data: StatsDto) => {
        this.stats = data;
      },
      error: (error) => {
        toast.error(error.error.message);
        console.error(error);
      }
    });
  }

  getNotifications() {
    this.notificationService.getAllNotifications(this.pageNumber, this.onlyUnread).subscribe({
      next: (data) => {
        this.notifications.push(...data.content);
        this.last = data.last;
      },
      error: (error) => {
        toast.error(error.error.message);
        console.error(error);
      }
    });
  }

  updateUnreadNotifications() {
    this.notificationService.countUnreadNotifications().subscribe({
      next: (data) => {
        this.notificationHelperService.$unreadNotifications.next(data);
      },
      error: (error) => {
        toast.error(error.error.message);
        console.error(error);
      }
    });
  }

  convertToNiceName(type: string, contentId: number) {
    return this.converterService.convertToNotificationNiceName(type, contentId);
  }

  convertToNiceDate(date: Date) {
    return this.converterService.convertToNiceDate(date);
  }

  loadMoreNotifications() {
    this.pageNumber++;
    this.getNotifications();
  }

  onOnlyUnreadChange() {
    this.pageNumber = 0;
    this.notifications = [];
    this.getNotifications();
  }

  navigateToContent(notification: Notification) {
    this.router.navigate([this.notificationHelperService.getNavigation(notification)]).then(
      () => {
        this.notificationService.markAsRead(notification.id).subscribe({
          next: () => {
            this.updateUnreadNotifications();
          },
          error: (error) => {
            toast.error(error.error.message);
            console.error(error);
          }
        });
      }
    );
  }
}
