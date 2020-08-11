import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { TicketService } from '../providers/ticket.service';
import { Ticket } from 'src/api/models/ticket';
import { LoadingService } from 'src/app/providers/loading.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.scss']
})
export class TicketViewComponent implements OnInit {

  ticket: Ticket;
  private _routeSnapshot: ActivatedRouteSnapshot;

  constructor(
    private _route: ActivatedRoute,
    private _ticketService: TicketService,
    private _loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this._routeSnapshot = this._route.snapshot;
    this._getTicketData();
  }

  private async _getTicketData(): Promise<void>{
    const ticketId = this._routeSnapshot.params.id;

    this._loadingService.loading = true;
    try {
      this.ticket = await this._ticketService.getOne(ticketId);
    } catch (error) {
      console.error(error);
    } finally{
      this._loadingService.loading = false;
    }
  }

}
