import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewTicketDto, Ticket } from 'src/api/models/ticket';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  tickets = new BehaviorSubject<Ticket[]>([]);

  constructor(private _http: HttpClient) { }

  createOne(newTicketData: NewTicketDto): Promise<Ticket>{
    return this._http.post<Ticket>(`${environment.apiUrl}/tickets`, newTicketData)
    .pipe(
      map((ticket: Ticket) => {
        this._pushToSubject(ticket);
        return ticket;
      })
    ).toPromise();
  }

  getAll(): Promise<Ticket[]>{
    return this._http.get<Ticket[]>(`${environment.apiUrl}/tickets`)
    .pipe(
      map((tickets: Ticket[]) => {
        this.tickets.next(tickets);
        return tickets;
      })
    ).toPromise();
  }

  getOne(id: number | string): Promise<Ticket>{
    return this._http.get<Ticket>(`${environment.apiUrl}/tickets/${id}`)
    .pipe(
      map((ticket: Ticket) => {
        this._updateTickets(ticket);
        return ticket;
      })
    )
    .toPromise();
  }

  private _pushToSubject(item: Ticket): void {
    const arr = this.tickets.getValue();
    arr.push(item);
    this.tickets.next(arr);
  }

  private _pushMultipleToSubject(items: Ticket[]) {
    const arr = this.tickets.getValue();
    arr.concat(items);
    this.tickets.next(arr);
  }

  private _updateTickets(ticket: Ticket): void{
    const arr = this.tickets.getValue();
    const index = arr.findIndex((searchElem) => searchElem.ticketId === ticket.ticketId);
    if (index >= 0){
      arr[index] = ticket;
    }
    this.tickets.next(arr);
  }
}
