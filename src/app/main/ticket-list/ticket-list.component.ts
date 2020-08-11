import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/api/models/ticket';
import { TicketService } from '../providers/ticket.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/providers/loading.service';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  private _tickets: Ticket[];
  filteredTickets: Ticket[];
  displayedTickets: Ticket[];
  searchFormControl = new FormControl('');

  defaultPageSize = 10;

  private _sub: Subscription;

  constructor(
    private _ticketService: TicketService,
    private _loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.getTickets();
    this._subToSearchChange();
  }

  async getTickets(){
    this._loadingService.loading = true;
    console.log('on Init');
    try {
      await this._ticketService.getAll();
    } catch (error) {
      console.error(error);
    } finally{
      this._loadingService.loading = false;
    }
    if (!this._sub){
      this._sub = this._ticketService.tickets.subscribe((tickets: Ticket[]) =>  {
        this._tickets = tickets;
        this.filteredTickets = tickets;
        this.onPage({length: tickets.length, pageIndex: 0, pageSize: this.defaultPageSize, previousPageIndex: 0});
      });
    }
  }

  onSearchDown($event: KeyboardEvent){
    if ($event.key === 'Enter'){
      this._filterTickets(this.searchFormControl.value);
    }
  }

  onPage($event: PageEvent): void{
    console.log($event);
    this.displayedTickets = this.filteredTickets.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
  }

  private _filterTickets(value: string){
    const searchValue = value.trim().toLowerCase();

    this.filteredTickets = this._tickets.filter((element) => {
      return (
        element.ticketHeader.toLowerCase().includes(searchValue) ||
        element.ticketAuthor.firstName.toLocaleLowerCase().includes(searchValue) ||
        element.ticketAuthor.lastName.toLocaleLowerCase().includes(searchValue)
      );
    });
  }


  private _subToSearchChange(): void {
    this.searchFormControl.valueChanges.subscribe((value: string) => {
      if (value.length === 0){
        this.filteredTickets = this._tickets;
      }
    });
  }
}
