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
}
