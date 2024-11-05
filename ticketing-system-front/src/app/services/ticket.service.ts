import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchTicketCriteria} from "../models/SearchTicketCriteria";
import {TicketResponseDto} from "../models/TicketResponseDto";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ticketUrl = 'http://localhost:8080/api/v1/ticket';

  constructor(private http: HttpClient) {
  }

  searchTickets(searchCriteria: SearchTicketCriteria, pageNumber: number) {
    searchCriteria.createdAfter = searchCriteria.createdAfter.trim()
    searchCriteria.createdBefore = searchCriteria.createdBefore.trim()

    return this.http.get<TicketResponseDto>(this.ticketUrl +
      `/search?customerId=${searchCriteria.customerId}`+
      `&ticketId=${searchCriteria.ticketId}&customerPhone=${searchCriteria.customerPhone}`+
      `&customerEmail=${searchCriteria.customerEmail}&content=${searchCriteria.content}`+
      `&isOpen=${searchCriteria.isOpen}&channel=${searchCriteria.channel}&categoryId=${searchCriteria.categoryId}`+
      `&subcategoryId=${searchCriteria.subcategoryId}&priority=${searchCriteria.priority}`+
      `&openedById=${searchCriteria.openedById}&closedById=${searchCriteria.closedById}`+
      `&createdAfter=${searchCriteria.createdAfter}&createdBefore=${searchCriteria.createdBefore}`+
      `&pageSize=10&pageNumber=${pageNumber}`);
  }
}
