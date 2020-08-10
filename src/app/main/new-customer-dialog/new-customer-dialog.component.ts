import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { zipValidator } from '../validators/zip.validator';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-customer-dialog',
  templateUrl: './new-customer-dialog.component.html',
  styleUrls: ['./new-customer-dialog.component.scss'],
})
export class NewCustomerDialogComponent implements OnInit {
  customerForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewCustomerDialogComponent>,
    ) {
  }

  ngOnInit(): void {
    this.customerForm = this._fb.group({
      personalData: this._fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      }),
      address: this._fb.group({
        address: ['', [Validators.required]],
        zip: ['', [Validators.required, zipValidator]],
        city: ['', [Validators.required]],
      }),
      contactData: this._fb.group({
        email: ['', Validators.email],
        phone: ['', [Validators.required]],
      })
    });

    this.customerForm.get('contactData').get('email').valueChanges.subscribe(() => {
      console.log(this.customerForm.get('contactData').get('email'));
    })
  }

  onClose(){
    this._dialogRef.close(this.customerForm.value);
  }
}
