import {Component} from '@angular/core';
import {TicketService} from "../../services/ticket.service";
import {Ticket} from "../../models/Ticket";
import {StatsDto} from "../../models/StatsDto";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats!: StatsDto;
  pageNumber: number = 0;
  last: boolean = false;

  constructor(private ticketService: TicketService) {
  }

  ngOnInit() {
    this.getStats();
    console.log(this.stats);
  }

  getStats() {
    this.ticketService.getStats().subscribe({
      next: (data: StatsDto) => {
        this.stats = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
