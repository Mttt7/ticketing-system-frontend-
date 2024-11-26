import {Component, ElementRef, ViewChild} from '@angular/core';
import {TicketService} from "../../services/api/ticket.service";
import {ActivatedRoute} from "@angular/router";
import {Ticket} from "../../models/Ticket";
import {toast} from "ngx-sonner";
import {CommentService} from "../../services/api/comment.service";
import {Comment} from "../../models/Comment";
import {UserProfile} from "../../models/UserProfile";
import {UserService} from "../../services/api/user.service";

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
  newFollowerId: number = -1;
  users: UserProfile[] = [];
  followers: UserProfile[] = [];
  displayedUsers: UserProfile[] = [];

  @ViewChild('new_comment_modal') newCommentModal!: ElementRef;
  @ViewChild('assign_to_modal') assign_to_modal!: ElementRef;

  constructor(private route: ActivatedRoute, private ticketService: TicketService,
              private commentService: CommentService, private userService: UserService) {
  }

  ngOnInit() {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.getTicketById(this.ticketId).subscribe(ticket => {
      this.ticket = ticket;
      this.getAllComments();
      this.getUsers();
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
      return;
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

  follow() {
    try {
      this.ticketService.followTicket(this.ticketId).subscribe((res) => {
        toast.success(res.message);
        this.ticket.isFollowed = true;
        this.getFollowers();
      })
    } catch (e) {
      console.error(e);
      toast.error('An error occurred while following the ticket');
    }
  }

  unfollow() {
    try {
      this.ticketService.unfollowTicket(this.ticketId).subscribe((res) => {
        this.getFollowers();
        this.ticket.isFollowed = false;
        toast.success(res.message);
        this.getFollowers();
      })
    } catch (e) {
      console.error(e);
      toast.error('An error occurred while unfollowing the ticket');
    }
  }


  followForOtherUser() {
    if (this.newFollowerId == -1) {
      toast.error('Please select a user to follow the ticket');
      return;
    }
    try {
      this.ticketService.followForOtherUser(this.ticketId, this.newFollowerId).subscribe((res) => {
        toast.success(res.message);
        this.assign_to_modal.nativeElement.close();
        this.ticketService.getIsTicketFollowed(this.ticketId).subscribe((res) => {
          this.ticket.isFollowed = res.isFollowed;
          this.getFollowers();
        })
      })
    } catch (e) {
      toast.error('An error occurred while following the ticket for other user');
    }
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.getFollowers();
    });
  }

  getFollowers() {
    this.ticketService.getFollowers(this.ticketId).subscribe((followers) => {
      this.followers = followers;
      this.displayedUsers = this.users.filter(user => !this.followers.some(follower => follower.email === user.email));
    })
  }
}
