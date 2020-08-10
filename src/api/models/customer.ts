export class Customer{
  customerId: number;
  firstName: string;
  lastName: string;
  address: string;
  zip: string;
  city: string;
  email?: string;
  phone: string;
}

export class NewCustomerDto{
  firstName: string;
  lastName: string;
  address: string;
  zip: string;
  city: string;
  email?: string;
  phone: string;
}