export class NewCustomerDialogResultDto {
  address: {
    address: string;
    zip: string;
    city: string;
  };

  contactData: {
    email?: string;
    phone: string;
  };

  personalData: {
    firstName: string;
    lastName: string;
  }
}
