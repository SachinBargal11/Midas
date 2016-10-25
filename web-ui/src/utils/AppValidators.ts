import {Directive} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CompanyStore} from '../stores/company-store';
import {Company} from '../models/company';

export class AppValidators {
    company: Company[];
    constructor(private _companyStore: CompanyStore,
                private directive: Directive
         ) {
    }
    static emailValidator(control: FormControl) {
        let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (control.value && !regEx.test(control.value)) {
            return { emailValidator: true };
        }
    }
    static mobileNoValidator(control: FormControl) {
        let regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (control.value && !regEx.test(control.value)) {
            return { mobileNoValidator: true };
        }
    }

    static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    }

    static selectedValueValidator(control: FormControl) {
        if (!parseInt(control.value)) {
            return { selectedValueValidator: true };
        }
    }

    static companyNameTaken = (company: any[]) => {
              function getFields(input, field) {
                        let output = [];
                        for (let i = 0; i < input.length ; ++i)
                            output.push(input[i][field]);
                        return output;
                    }
          return (control: FormControl) => {
                    let companyNames = getFields(company, 'companyName');

                for (let i = 0; i < company.length ; i += 1) {
                   let val = company[i].toString();
                   if (control.value === val) {
                       return {companyNameTaken: true};
                      }
                }
          };
    }
    static emailTaken = (company: any) => {
          return (control: FormControl) => {
                for (let i = 0; i < company.length ; i += 1) {
                   let val = company[i].toString();
                   if (control.value === val) {
                       return {emailTaken: true};
                      }
                }
          };
    }

//   static companyNameTaken = (company: any) => {
//           return (control: FormControl) => {
// //  let companyNames: string[] = [ 'John', 'sachin', 'Jill', 'Jackie', 'Jim'];
//        let q = new Promise((resolve, reject) => {
//          setTimeout(() => {
//         //    if (controlValue === 'David') {
//             for (let i = 0; i < company.length ; i += 1) {
//             let val = company[i].toString();
//             if (control.value === val) {
//                  alert(val);
//                 resolve({'companyNameTaken': true});
//                } else {
//                  resolve(null);
//                }
//             }
//          }, 1000);
//        });
//        return q;
//      };
//     };

}
