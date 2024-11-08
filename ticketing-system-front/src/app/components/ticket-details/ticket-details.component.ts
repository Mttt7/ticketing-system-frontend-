import {Component} from '@angular/core';
import {TicketService} from "../../services/ticket.service";
import {ActivatedRoute} from "@angular/router";
import {Ticket} from "../../models/Ticket";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent {

  ticketId: number=-1;
  ticket!:Ticket;

  constructor(private route: ActivatedRoute, private ticketService:TicketService) {}

  ngOnInit() {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.getTicketById(this.ticketId).subscribe(ticket => {
      this.ticket = ticket;
      console.log(this.ticket);
    })
  }

  getOpenedSince() {
    let openedSince = new Date(this.ticket.createdAt);
    let now = new Date();
    let timeDiff = Math.abs(now.getTime() - openedSince.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }

  getClosedSince() {
    let closedSince = new Date(this.ticket.closedAt);
    let now = new Date();
    let timeDiff = Math.abs(now.getTime() - closedSince.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'LOW':
        return 'priority-low';
      case 'MEDIUM':
        return 'priority-medium';
      case 'HIGH':
        return 'priority-high';
      case 'CRITICAL':
        return 'priority-critical';
      default:
        return '';
    }
  }
}
