import {Component} from '@angular/core';
import {TicketService} from "../../services/ticket.service";
import {Ticket} from "../../models/Ticket";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  followedTickets: Ticket[] = [];
  pageNumber: number = 0;
  allPages: number = 0;
  last: boolean = false;
  dateDesc: boolean = true;

  constructor(private ticketService: TicketService) {
  }

  ngOnInit() {
    this.getFollowedTickets();
  }

  getFollowedTickets() {
    const sort = this.dateDesc ? 'dateDesc' : 'dateAsc';
    this.ticketService.getFollowedTickets(this.pageNumber, 10, sort).subscribe((res) => {
      console.log(res);
      this.last = res.last;
      this.allPages = res.totalPages;
      this.followedTickets = res.content;
    })
  }

  openTicketDetails(ticket: any) {
    const url = `/tickets/${ticket.id}`;
    window.open(url, '_blank');
  }

  nextPage() {
    if (this.last) return;
    this.pageNumber++;
    this.getFollowedTickets();
  }

  previousPage() {
    if (this.pageNumber == 0) return
    this.pageNumber--;
    this.getFollowedTickets();
  }


  onSortChange() {
    this.pageNumber = 0;
    this.getFollowedTickets();
  }
}
