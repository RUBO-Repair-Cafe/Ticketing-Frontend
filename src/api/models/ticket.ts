import { Customer } from './customer';
import { Comment } from './comment';
import { User } from './user';

export const enum TicketStatus{
  CREATED,
  NEEDS_TRIAGE,
  ASSIGNED,
  DOING,
  DONE,
  FAILED
}

export class Ticket {
  ticketId: number;
  ticketHeader: string;
  ticketBody: string;
  ticketAuthor: User;
  assignedUsers: User[];
  assignedCustomer: Customer;
  ticketStatus: TicketStatus;
  comments: Comment[];
}

export class NewTicketDto {
  assignedCustomer: Customer;
  ticketHeader: string;
  ticketBody: string;
  ticketStatus: TicketStatus;
  assignedUsers?: User[];
}