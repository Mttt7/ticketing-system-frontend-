export interface TicketRequestDto {
  customerId: number;
  content: string;
  channel: string;
  priority: string;
  categoryId: number;
  subcategoryId: number;
}
