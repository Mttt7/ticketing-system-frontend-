import {UserProfile} from "./UserProfile";

export interface Comment {
  id: number;
  content: string;
  author: UserProfile;
  ticketId: number;
  commentType: string;
  createdAt: Date;
}
