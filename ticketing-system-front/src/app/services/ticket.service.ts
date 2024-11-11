import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchTicketCriteria} from "../models/SearchTicketCriteria";
import {TicketsResponseDto} from "../models/TicketsResponseDto";
import {Observable} from "rxjs";
import {Ticket} from "../models/Ticket";
import {UserProfile} from "../models/UserProfile";

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

    return this.http.get<TicketsResponseDto>(this.ticketUrl +
      `/search?customerId=${searchCriteria.customerId}` +
      `&ticketId=${searchCriteria.ticketId}&customerPhone=${searchCriteria.customerPhone}` +
      `&customerEmail=${searchCriteria.customerEmail}&content=${searchCriteria.content}` +
      `&isOpen=${searchCriteria.isOpen}&channel=${searchCriteria.channel}&categoryId=${searchCriteria.categoryId}` +
      `&subcategoryId=${searchCriteria.subcategoryId}&priority=${searchCriteria.priority}` +
      `&openedById=${searchCriteria.openedById}&closedById=${searchCriteria.closedById}` +
      `&createdAfter=${searchCriteria.createdAfter}&createdBefore=${searchCriteria.createdBefore}` +
      `&pageSize=10&pageNumber=${pageNumber}`);
  }

  createTicket(ticketData: any) {
    return this.http.post(this.ticketUrl + '/', ticketData);
  }

  getTicketById(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(this.ticketUrl + '/' + ticketId);
  }

  getFollowedTickets(pageNumber: number, pageSize: number, sort: string): Observable<TicketsResponseDto> {
    return this.http.get<TicketsResponseDto>(this.ticketUrl + `/followed?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`);
  }

  getIsTicketFollowed(ticketId: number): Observable<{ isFollowed: boolean }> {
    return this.http.get<{ isFollowed: boolean }>(this.ticketUrl + '/is-followed/' + ticketId);
  }

  followTicket(ticketId: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.ticketUrl + '/follow/' + ticketId, null);
  }

  unfollowTicket(ticketId: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.ticketUrl + '/unfollow/' + ticketId, null);
  }

  followForOtherUser(ticketId: number, userId: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.ticketUrl + '/follow/' + ticketId + '/' + userId, null);
  }

  getFollowers(ticketId: number): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.ticketUrl + "/" + ticketId + '/followers');
  }
}
