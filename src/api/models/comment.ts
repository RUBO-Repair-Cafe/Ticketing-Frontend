import { User } from './user';
import { Ticket } from './ticket';

export class Comment{
  commentId: number;
  comment: string;
  author: User;
  ticket: Ticket;
}