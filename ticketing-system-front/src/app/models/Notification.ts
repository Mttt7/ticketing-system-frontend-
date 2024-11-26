export interface Notification {
  id: number;
  type: string;
  contentId: number;
  isRead: boolean;
  text: string;
  createdAt: Date;
}
