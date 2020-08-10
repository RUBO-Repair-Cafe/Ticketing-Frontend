import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewCustomerDialogComponent } from '../new-customer-dialog/new-customer-dialog.component';
import { CustomerService } from '../providers/customer.service';
import { NewCustomerDialogResultDto } from '../new-customer-dialog/result.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewCustomerDto } from 'src/api/models/customer';
import { TicketService } from '../providers/ticket.service';
import { NewTicketDto, TicketStatus } from 'src/api/models/ticket';
import { LoadingService } from 'src/app/providers/loading.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpStatusCode } from 'src/app/statuscode.enum';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss'],
})
export class NewTicketComponent implements OnInit {
  newTicketForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private dialog: MatDialog,
    public customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private _loadingService: LoadingService,
    private _ticketService: TicketService
  ) {}

  async ngOnInit(): Promise<void> {
    this.newTicketForm = this._fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      customer: ['', Validators.required],
    });

    this.newTicketForm.valueChanges.subscribe(() => {
      console.log(this.newTicketForm.errors);
    });

    this._loadingService.loading = true;
    try {
      await this.customerService.getAll();
    } catch (error) {
      console.error(error);
      this._snackBar.open(
        'Beim Laden der Kunden ist ein Fehler aufgetreten',
        'OK',
        { duration: 3000 }
      );
    } finally {
      this._loadingService.loading = false;
    }
  }

  openNewCustomerDialog(): void {
    const dialogRef = this.dialog.open(NewCustomerDialogComponent);

    dialogRef
      .afterClosed()
      .subscribe(async (result: NewCustomerDialogResultDto) => {
        console.log('Dialog result', result);
        const customer: NewCustomerDto = {
          address: result.address.address,
          city: result.address.city,
          firstName: result.personalData.firstName,
          lastName: result.personalData.lastName,
          phone: result.contactData.phone,
          zip: result.address.zip,
        };
        if (result.contactData.email && result.contactData.email !== '') {
          customer.email = result.contactData.email;
        }
        this._loadingService.loading = true;
        try {
          await this.customerService.createOne(customer);
          this._snackBar.open('Kunde erfolgreich angelegt', 'OK', {
            duration: 3000,
          });
        } catch (error) {
          console.error(error);
          this._snackBar.open(
            'Es ist ein Fehler beim erstellen aufgetreten',
            'OK',
            {
              duration: 3000,
            }
          );
        } finally {
          this._loadingService.loading = false;
        }
      });
  }

  async onFormSubmit(): Promise<void> {
    const ticket: NewTicketDto = {
      assignedCustomer: this.newTicketForm.value.customer,
      ticketBody: this.newTicketForm.value.body,
      ticketHeader: this.newTicketForm.value.title,
      ticketStatus: TicketStatus.CREATED,
    };
    this._loadingService.loading = true;
    try {
      const createdTicket = await this._ticketService.createOne(ticket);
      this._snackBar.open(`Ticket ${createdTicket.ticketId} wurde erstellt`, 'OK', {
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      if (
        error instanceof HttpErrorResponse &&
        error.status === HttpStatusCode.Unauthorized
      ) {
      } else {
        this._snackBar.open('Es ist ein Fehler aufgetreten', 'OK', {
          duration: 3000,
        });
      }
    } finally {
      this._loadingService.loading = false;
    }
  }
}
