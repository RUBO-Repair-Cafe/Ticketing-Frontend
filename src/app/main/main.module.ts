import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { NewCustomerDialogComponent } from './new-customer-dialog/new-customer-dialog.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CustomerService } from './providers/customer.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketListModule } from './ticket-list/ticket-list.module';
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { TicketViewModule } from './ticket-view/ticket-view.module';


const routes: Routes = [
  { path: 'main', component: NavComponent, children: [
    { path: 'tickets/new', component: NewTicketComponent },
    { path: 'tickets', component: TicketListComponent },
    { path: 'tickets/:id', component: TicketViewComponent },
  ]},
];

@NgModule({
  declarations: [NavComponent, NewCustomerDialogComponent, NewTicketComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    TicketListModule,
    TicketViewModule,
    RouterModule.forChild(routes),
  ],
  providers: [CustomerService]
})
export class MainModule { }
