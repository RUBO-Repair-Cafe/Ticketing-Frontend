import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from 'src/api/models/ticket';
import { TicketService } from '../../providers/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-entry',
  templateUrl: './ticket-entry.component.html',
  styleUrls: ['./ticket-entry.component.scss']
})
export class TicketEntryComponent implements OnInit {

  @Input() ticket: Ticket;

  constructor(
    private _router:Router,
  ) { }

  async ngOnInit(): Promise<void> {}

  openTicket(id: number): void{
    this._router.navigate(['main', 'tickets', id ]);
  }

}
