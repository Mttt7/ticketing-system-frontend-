import {Ticket} from "./Ticket";

export interface TicketResponseDto {
  content: Ticket[]
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}
