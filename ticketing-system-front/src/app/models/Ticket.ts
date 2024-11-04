import {Customer} from "./Customer";
import {UserProfile} from "./UserProfile";
import {Subcategory} from "./Subcategory";
import {Category} from "./Category";

export interface Ticket{
  id: number;
  customer:Customer;
  content: string;
  isOpen: boolean;
  channel: string;
  category: Category;
  subcategory: Subcategory;
  priority: string;
  openedBy: UserProfile;
  closedBy?: UserProfile;
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
}
