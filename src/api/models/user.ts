import { Image } from './image';
import { Comment } from './comment';
import { Ticket } from './ticket';

export class User{
 userId: number;
 firstName: string;
 lastName: string;
 username: string;
 email: string;
 profilePicture: Image;
 comments: Comment[];
 createdTickets: Ticket[];
 assignedTickets: Ticket[];
}