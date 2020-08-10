import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer, NewCustomerDto } from 'src/api/models/customer';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customers = new BehaviorSubject<Customer[]>([]);

  constructor(private _http: HttpClient) {}

  createOne(newCustomerData: NewCustomerDto): Promise<Customer> {
    return this._http
      .post<Customer>(`${environment.apiUrl}/customers`, newCustomerData)
      .pipe(
        map((customer: Customer) => {
          this._pushToSubject(customer);
          return customer;
        })
      )
      .toPromise();
  }

  getAll(): Promise<Customer[]> {
    return this._http
      .get<Customer[]>(`${environment.apiUrl}/customers`)
      .pipe(
        map((customers: Customer[]) => {
          this.customers.next(customers);
          return customers;
        })
      )
      .toPromise();
  }

  private _pushToSubject(item: Customer): void {
    const arr = this.customers.getValue();
    arr.push(item);
    this.customers.next(arr);
  }

  private _pushMultipleToSubject(items: Customer[]) {
    const arr = this.customers.getValue();
    arr.concat(items);
    this.customers.next(arr);
  }
}
