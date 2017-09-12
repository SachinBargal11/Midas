import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

export class AppValidators {
    constructor(
    ) {
    }
    static emailValidator(control: FormControl) {
        let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (control.value && !regEx.test(control.value)) {
            return { emailValidator: true };
        }
    }
    static mobileNoValidator(control: FormControl) {
        // let regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let regEx = /^\(?([+1]{2})\)?[-. ]?([0-9]{3})?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (control.value && !regEx.test(control.value)) {
            return { mobileNoValidator: true };
        }
    }

    static numberValidator(control: FormControl) {
            var re = /^([0-9]+)$/g;
            // var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)/g;
            if (control.value && !re.test(control.value)) {
                 return { numberValidator: true };
            }
    }

    static passwordValidator(control: FormControl) {
        let regEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=\S+$).{8,}$/;
        if (control.value && !regEx.test(control.value)) {
            return { passwordValidator: true };
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

    static timeValidation(slotStartKey: any, slotEndKey: any) {
        return (group: FormGroup): { [key: string]: any } => {
            let slotStart = group.controls[slotStartKey];
            let slotEnd = group.controls[slotEndKey];

            if (!moment(slotStart.value).isBefore(moment(slotEnd.value))) {
                return { timeValidation: true };
            }

        };
    }

    static selectedValueValidator(control: FormControl) {
        if (!parseInt(control.value)) {
            return { selectedValueValidator: true };
        }
    }

    static companyNameTaken = (company: any[]) => {
        // function getFields(input, field) {
        //     let output = [];
        //     for (let i = 0; i < input.length; ++i)
        //         output.push(input[i][field]);
        //     return output;
        // }
        return (control: FormControl) => {
            // let companyNames = getFields(company, 'companyName');

            for (let i = 0; i < company.length; i += 1) {
                let val = company[i].toString();
                if (control.value === val) {
                    return { companyNameTaken: true };
                }
            }
        };
    }
    static emailTaken = (company: any) => {
        return (control: FormControl) => {
            for (let i = 0; i < company.length; i += 1) {
                let val = company[i].toString();
                if (control.value === val) {
                    return { emailTaken: true };
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
