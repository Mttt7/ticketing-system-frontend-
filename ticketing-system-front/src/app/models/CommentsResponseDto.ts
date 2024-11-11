import {Comment} from "./Comment";

export interface CommentsResponseDto {
  content: Comment[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}

