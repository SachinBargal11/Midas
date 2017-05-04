import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'billing',
    templateUrl: './billing.html'
})


export class BillingInfoComponent implements OnInit {

    verificationform: FormGroup;
    verificationformControls;
    postcheckform: FormGroup;
    postcheckformControls;
    denialform: FormGroup;
    denialformControls;
    postDialogVisible: boolean = false;
    verificationDialogVisible: boolean = false;
    denialDialogVisible: boolean = false;
    verficationScanUploadDialogVisible: boolean = false;
    scanUploadDialogVisible: boolean = false;

    constructor(
        private fb: FormBuilder,
        private _elRef: ElementRef
    ) {
           this.postcheckform = this.fb.group({
            date: [''],
        });

        this.postcheckformControls = this.postcheckform.controls;

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

    billing: any[] = [
        {
            bill: "ab69852", speciality: "AC", visitDate: "03/05/2017",
            billDate: "03/05/2017", billAmount: "$560", paid: "$560",
            outstanding: "0", status: "Paid", balance: "0",
            principalAmount: "", paymentType: "", paidBy: "", description: "",
            type:"Verification Received", notes:"Dummy Text",user:"Citibr",
            billStatus:"POM Received",documents:"Scan/Upload",date:"14/08/2017",
            reason:"120 days rule"
        },

        {
            bill: "ab69851", speciality: "PT", visitDate: "01/05/2017",
            billDate: "03/05/2017", billAmount: "$560", paid: "$460",
            outstanding: "$100", status: "Litgate", balance: "0",
            principalAmount: "", paymentType: "", paidBy: "", description: "",
            type:"Verification Received", notes:"Dummy Text",user:"Citibr",
            billStatus:"POM Received",documents:"Scan/Upload",date:"16/08/2017",
            reason:"30 days rule"
        }];


    ngOnInit() {

    }

    postCheck() {
        this.postDialogVisible = true;
    }
    
    showVerificationDialog() {
        this.verificationDialogVisible = true;
    }

    showDenialDialog() {
        this.denialDialogVisible = true;
    }

    showDialog() {
        this.scanUploadDialogVisible = true;
    }
    showVerficationUploadDialog() {
        this.verficationScanUploadDialogVisible = true;
    }
}
