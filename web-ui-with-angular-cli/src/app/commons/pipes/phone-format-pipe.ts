import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
    transform(value) {
        if (!value) { return ''; }

        value = String(value);
        let inputString = value.replace(/\-/g, '');
        if (inputString.length == 12) {
            return inputString.substring(0, 2) + ' ' + inputString.substring(2, 5) + '-' + inputString.substring(5, 8) + '-' + inputString.substring(8, 12);
        } else if (inputString.length == 13)
            return inputString.substring(0, 3) + ' ' + inputString.substring(3, 6) + '-' + inputString.substring(6, 9) + '-' + inputString.substring(9, 13);
    }

    trimCountryCode(value) {
        if (!value) { return ''; }

        value = String(value);
        let inputString = value.replace(/\-/g, '');
        if (inputString.length == 12) {
            return inputString.substring(0, 2);
        } else if (inputString.length == 13){
             return inputString.substring(0, 3);
    } else if (inputString.length == 14){
             return inputString.substring(0, 4);
    }
    }


    trimCellPhone(value) {
        if (!value) { return ''; }

        value = String(value);
        let inputString:string = value.replace(/\-/g, '');
        let reverseInputString = inputString.split("").reverse().join("");
        let trimedCellPhone =  reverseInputString.substring(0, 4) + '-' + reverseInputString.substring(4, 7) + '-' + reverseInputString.substring(7, 10);
         return trimedCellPhone.split("").reverse().join("");
    }
}