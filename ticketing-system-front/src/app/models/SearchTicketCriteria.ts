export interface SearchTicketCriteria {
  ticketId: number;
  customerId: number;
  customerEmail: string;
  customerPhone: string;
  content: string;
  isOpen?: boolean;
  isFollowed?: boolean;
  channel: string;
  categoryId: number;
  subcategoryId: number;
  priority: string;
  openedById: number;
  closedById: number;
  createdAfter: string;
  createdBefore: string;
}
