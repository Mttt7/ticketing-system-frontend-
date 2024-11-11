import {Customer} from "./Customer";
import {UserProfile} from "./UserProfile";
import {Subcategory} from "./Subcategory";
import {Category} from "./Category";
import {Channel} from "./Channel";

export interface Ticket {
  id: number;
  customer: Customer;
  content: string;
  isOpen: boolean;
  channel: Channel;
  category: Category;
  subcategory: Subcategory;
  priority: string;
  isFollowed: boolean;
  openedBy: UserProfile;
  closedBy?: UserProfile;
  createdAt: Date;
  updatedAt: Date;
  closedAt: Date;
}
