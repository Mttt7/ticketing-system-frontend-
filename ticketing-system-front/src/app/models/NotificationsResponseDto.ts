import {Notification} from "./Notification";

export interface NotificationsResponseDto {
  content: Notification[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}
