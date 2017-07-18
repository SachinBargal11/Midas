import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { Insurance } from '../models/insurance';
import { InsuranceMaster } from '../models/insurance-master';
import { InsuranceStore } from '../stores/insurance-store';
import { PatientsStore } from '../stores/patients-store';

@Component({
    selector: 'add-insurance',
    templateUrl: './add-insurance.html'
})


export class AddInsuranceComponent implements OnInit {
    states: any[];
    insuranceMasters: InsuranceMaster[];
    insuranceMaster: InsuranceMaster;
    insuranceMastersAdress: Address;
    policyCities: any[];
    insuranceCities: any[];
    patientId: number;
    selectedCity = 0;
    isPolicyCitiesLoading = false;
    isInsuranceCitiesLoading = false;
    // msgs: Message[];
    uploadedFiles: any[] = [];

    insuranceform: FormGroup;
    insuranceformControls;
    isSaveProgress = false;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _insuranceStore: InsuranceStore,
        private _patientsStore: PatientsStore,
        private _elRef: ElementRef
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId);
        });
        //  this._insuranceStore.getInsurancesMaster()
        //     .subscribe(
        //     (insuranceMasters) => {
        //         this.insuranceMasters = insuranceMasters;
        //         this.insuranceMasters.forEach(element => {
        //             this.insuranceMastersAdress = element.Address
        //         });
        //     });


        this.insuranceform = this.fb.group({
            policyNumber: ['', Validators.required],
            policyOwner: ['', Validators.required],
            policyHoldersName: ['', Validators.required],
            insuranceCompanyCode: [''],
            insuranceMasterId: ['', Validators.required],
            insuranceType: ['', Validators.required],
            contactPerson: ['', Validators.required],
            policyAddress: ['', Validators.required],
            policyAddress2: [''],
            policyState: [''],
            policyCity: [''],
            policyZipCode: [''],
            policyCountry: [''],
            policyEmail: ['', [Validators.required, AppValidators.emailValidator]],
            policyCellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            policyHomePhone: [''],
            policyWorkPhone: [''],
            policyFaxNo: [''],
            policyOfficeExtension:[''],
            policyAlternateEmail:['', [ AppValidators.emailValidator]],
            policyPreferredCommunication:[''],
            address: [''],
            address2: [''],
            state: [''],
            city: [''],
            zipcode: [''],
            country: [''],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            homePhone: [''],
            workPhone: [''],
            faxNo: [''],
            alternateEmail:  ['', [AppValidators.emailValidator]],
            officeExtension: [''],
            preferredCommunication: ['']
        });

        this.insuranceformControls = this.insuranceform.controls;
    }
    ngOnInit() {
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
        this._insuranceStore.getInsurancesMaster()
            .subscribe(insuranceMasters => this.insuranceMasters = insuranceMasters);
    }

    selectInsurance(event) {
        // this.selectedInsurance = 0;
        let currentInsurance: number = parseInt(event.target.value);
        this.loadInsuranceMasterAddress(currentInsurance);
    }

    loadInsuranceMasterAddress(currentInsurance) {
        if (currentInsurance) {
        this._insuranceStore.getInsuranceMasterById(currentInsurance)
            .subscribe(
            (insuranceMaster) => {
                this.insuranceMaster = insuranceMaster;
                this.insuranceMastersAdress = insuranceMaster.Address
            });
        } else {
            this.insuranceMaster = null;
            this.insuranceMastersAdress = null;
        }
    }

      onUpload(event) {

        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

          //this.msgs = [];
        //this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }



    // selectPolicyState(event) {
    //     this.selectedCity = 0;
    //     let currentState = event.target.value;
    //     this.loadPolicyCities(currentState);
    // }

    // loadPolicyCities(stateName) {
    //     this.isPolicyCitiesLoading = true;
    //     if (stateName !== '') {
    //         this._statesStore.getCitiesByStates(stateName)
    //             .subscribe((cities) => { this.policyCities = cities; },
    //             null,
    //             () => { this.isPolicyCitiesLoading = false; });
    //     } else {
    //         this.policyCities = [];
    //         this.isPolicyCitiesLoading = false;
    //     }
    // }
    // selectInsuranceState(event) {
    //     this.selectedCity = 0;
    //     let currentState = event.target.value;
    //     this.loadInsuranceCities(currentState);
    // }

    // loadInsuranceCities(stateName) {
    //     this.isInsuranceCitiesLoading = true;
    //     if (stateName !== '') {
    //         this._statesStore.getCitiesByStates(stateName)
    //             .subscribe((cities) => { this.insuranceCities = cities; },
    //             null,
    //             () => { this.isInsuranceCitiesLoading = false; });
    //     } else {
    //         this.insuranceCities = [];
    //         this.isInsuranceCitiesLoading = false;
    //     }
    // }

    save() {
        this.isSaveProgress = true;
        let insuranceformValues = this.insuranceform.value;
        let result;
        let insurance = new Insurance({
            patientId: this.patientId,
            policyHoldersName: insuranceformValues.policyHoldersName,
            policyOwnerId: insuranceformValues.policyOwner,
            policyNo: insuranceformValues.policyNumber,
            insuranceCompanyCode: insuranceformValues.insuranceCompanyCode,
            contactPerson: insuranceformValues.contactPerson,
            insuranceType: insuranceformValues.insuranceType,
            insuranceMasterId: insuranceformValues.insuranceMasterId,
            policyContact: new Contact({
                cellPhone: insuranceformValues.policyCellPhone ? insuranceformValues.policyCellPhone.replace(/\-/g, '') : null,
                emailAddress: insuranceformValues.policyEmail,
                faxNo: insuranceformValues.policyFaxNo ? insuranceformValues.policyFaxNo.replace(/\-|\s/g, '') : null,
                homePhone: insuranceformValues.policyHomePhone,
                workPhone: insuranceformValues.policyWorkPhone,
                officeExtension: insuranceformValues.policyOfficeExtension,
                alternateEmail: insuranceformValues.policyAlternateEmail,
                preferredCommunication: insuranceformValues.policyPreferredCommunication,

            }),
            policyAddress: new Address({
                address1: insuranceformValues.policyAddress,
                address2: insuranceformValues.policyAddress2,
                city: insuranceformValues.policyCity,
                country: insuranceformValues.policyCountry,
                state: insuranceformValues.policyState,
                zipCode: insuranceformValues.policyZipCode
            }),
            insuranceContact: new Contact({
                cellPhone: insuranceformValues.cellPhone ? insuranceformValues.cellPhone.replace(/\-/g, '') : null,
                emailAddress: insuranceformValues.email,
                faxNo: insuranceformValues.faxNo ? insuranceformValues.faxNo.replace(/\-|\s/g, '') : null,
                homePhone: insuranceformValues.homePhone,
                workPhone: insuranceformValues.workPhone,
                officeExtension: insuranceformValues.officeExtension,
                alternateEmail: insuranceformValues.alternateEmail,
                preferredCommunication: insuranceformValues.preferredCommunication,
            }),
            insuranceAddress: new Address({
                address1: insuranceformValues.address,
                address2: insuranceformValues.address2,
                city: insuranceformValues.city,
                country: insuranceformValues.country,
                state: insuranceformValues.state,
                zipCode: insuranceformValues.zipCode
            })
        });
        this._progressBarService.show();
        result = this._insuranceStore.addInsurance(insurance);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Insurance added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add insurance.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });
    }
}
