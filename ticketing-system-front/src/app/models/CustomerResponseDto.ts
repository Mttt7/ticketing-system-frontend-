import {Customer} from "./Customer";

export interface CustomerResponseDto{
  content: Customer[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}
