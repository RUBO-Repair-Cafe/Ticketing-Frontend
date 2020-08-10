import { ValidatorFn, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

export function zipValidator(control: AbstractControl): null | ValidationErrors {
  const zip = `${control.value}`;
  let returnObject = null;
  if (!Number(zip)){
    returnObject = { validZip: true, pattern: true};
  }
  if (zip.length !== 5){
    if (!returnObject){
      returnObject = { validZip: true};
    }
    returnObject.length = true;
  }
  return returnObject;
}
