import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../models/Comment";
import {CommentsResponseDto} from "../models/CommentsResponseDto";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentUrl = 'http://localhost:8080/api/v1/comment';

  constructor(private http: HttpClient) {
  }

  getAllComments(ticketId: number, page: number, size: number): Observable<CommentsResponseDto> {
    return this.http.get<CommentsResponseDto>(this.commentUrl + `/?ticketId=${ticketId}&pageNumber=${page}&pageSize=${size}`);
  }

  addComment(ticketId: number, newCommentContent: string): Observable<Comment> {
    return this.http.post<Comment>(this.commentUrl + '/', {
      ticketId,
      content: newCommentContent,
      commentType: 'INTERNAL'
    });
  }
}
