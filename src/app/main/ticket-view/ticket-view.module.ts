import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketViewComponent } from './ticket-view.component';



@NgModule({
  declarations: [TicketViewComponent],
  imports: [
    CommonModule
  ], exports: [
    TicketViewComponent
  ],
  providers: []
})
export class TicketViewModule { }
