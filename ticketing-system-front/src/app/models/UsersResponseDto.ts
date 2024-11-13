import {UserProfile} from "./UserProfile";

export interface UsersResponseDto {
  content: UserProfile[]
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}
