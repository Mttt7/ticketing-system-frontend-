import {Department} from "./Department";

export interface DepartmentsResponseDto {
  content: Department[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}
