import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ticket} from "../../models/Ticket";

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrl: './tickets-table.component.css'
})
export class TicketsTableComponent {
  @Input() tickets: Ticket[] = [];
  @Output() openTicketDetails = new EventEmitter<Ticket>();


  onOpenTicketDetails(ticket: Ticket) {
    this.openTicketDetails.emit(ticket);
  }
}
