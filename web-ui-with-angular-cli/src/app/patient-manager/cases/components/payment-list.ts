import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'payment-list',
    templateUrl: './payment-list.html'
})

export class PaymentListComponent {

    denialform: FormGroup;
    denialformControls;
    verificationform: FormGroup;
    verificationformControls;
    denialDialogVisible: boolean = false;
    scanUploadDialogVisible: boolean = false;
    verificationDialogVisible: boolean = false;


    constructor(
        private fb: FormBuilder,
        private _elRef: ElementRef
    ) {
          this.verificationform = this.fb.group({
            dov: [''],
            verificationDescription: [''],
        });

        this.verificationformControls = this.verificationform.controls;

        this.denialform = this.fb.group({
            dod: [''],
            description: [''],
            denialReason: [''],
            denialDescription: [''],
        });

        this.denialformControls = this.denialform.controls;

    }
    payment: any[] = [
        {
            billNumber: "ab69852", checkNumber: "14523", postedDate: "01/05/2017",
            checkDate: "03/05/2016", checkAmount: "$560", paymentType: "Recieved",
            interest: "", description: "", checks: "Scan/Upload",
            view: "", denials: "Enter Denial", verifications: "Enter Verification", delete: "",
            bill: "ab69852", type:"Verification Received", notes:"Dummy Text", user:"Citibr",
            billStatus:"POM Received", documents:"Scan/Upload", date:"16/08/2017",
            reason:"30 days rule"
        }]

    showDenialDialog() {
        this.denialDialogVisible = true;
    }

     showDialog() {
        this.scanUploadDialogVisible = true;
    }

     showVerificationDialog() {
        this.verificationDialogVisible = true;
    }
}