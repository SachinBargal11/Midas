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
        let regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (control.value && !regEx.test(control.value)) {
            return { mobileNoValidator: true };
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

}
