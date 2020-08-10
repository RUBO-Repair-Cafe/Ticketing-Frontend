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


const routes: Routes = [
  { path: 'main', component: NavComponent, children: [
    { path: 'ticket/new', component: NewTicketComponent}
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
    RouterModule.forChild(routes),
  ],
  providers: [CustomerService]
})
export class MainModule { }
