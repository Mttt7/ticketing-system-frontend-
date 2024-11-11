import {Component, ElementRef, ViewChild} from '@angular/core';
import {TicketService} from "../../services/ticket.service";
import {ActivatedRoute} from "@angular/router";
import {Ticket} from "../../models/Ticket";
import {toast} from "ngx-sonner";
import {CommentService} from "../../services/comment.service";
import {Comment} from "../../models/Comment";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent {

  ticketId: number = -1;
  ticket!: Ticket;
  newCommentContent: string = '';
  pageNumber: number = 0;
  allPages: number = 0;
  last: boolean = false;
  comments: Comment[] = [];

  @ViewChild('new_comment_modal') newCommentModal!: ElementRef;

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private commentService: CommentService) {
  }

  ngOnInit() {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.getTicketById(this.ticketId).subscribe(ticket => {
      this.ticket = ticket;
      this.getAllComments();
    })
  }

  getOpenedSince() {
    let openedSince = new Date(this.ticket.createdAt);
    let now = new Date();
    let timeDiff = Math.abs(now.getTime() - openedSince.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }

  getClosedSince() {
    let closedSince = new Date(this.ticket.closedAt);
    let now = new Date();
    let timeDiff = Math.abs(now.getTime() - closedSince.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'LOW':
        return 'priority-low';
      case 'MEDIUM':
        return 'priority-medium';
      case 'HIGH':
        return 'priority-high';
      case 'CRITICAL':
        return 'priority-critical';
      default:
        return '';
    }
  }

  getAllComments() {
    this.commentService.getAllComments(this.ticketId, this.pageNumber, 10).subscribe((response) => {
      this.pageNumber = response.number;
      this.last = response.last;
      this.allPages = response.totalPages;
      this.comments.push(...response.content);
    })
  }

  addComment() {
    if (this.newCommentContent.length == 0) {
      toast.error('Comment content cannot be empty');
    }
    this.commentService.addComment(this.ticketId, this.newCommentContent).subscribe((res) => {
      this.comments.unshift(res);
      this.newCommentContent = '';
      toast.success('Comment added successfully');
      this.newCommentModal.nativeElement.close();
    })
  }

  loadMore() {
    this.pageNumber++;
    this.getAllComments();
  }
}
