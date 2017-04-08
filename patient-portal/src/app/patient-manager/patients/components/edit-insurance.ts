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
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from '../../../commons/pipes/faxno-format-pipe';

@Component({
    selector: 'edit-insurance',
    templateUrl: './edit-insurance.html'
})


export class EditInsuranceComponent implements OnInit {
    insuranceMasters: InsuranceMaster[];
    insuranceMastersAdress: Address;
    insuranceMaster: InsuranceMaster;
    policyCellPhone: string;
    policyFaxNo: string;
    insuranceCellPhone: string;
    insuranceFaxNo: string;
    states: any[];
    policyCities: any[];
    insuranceCities: any[];
    selectedPolicyCity;
    selectedInsuranceCity;
    insurance: Insurance;
    policyAddress = new Address({});
    policyContact = new Contact({});
    insuranceAddress = new Address({});
    insuranceContact = new Contact({});
    patientId;
    isPolicyCitiesLoading = false;
    isInsuranceCitiesLoading = false;

    insuranceform: FormGroup;
    insuranceformControls;
    isSaveProgress = false;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
       public notificationsStore: NotificationsStore,
        public progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        public sessionStore: SessionStore,
        private _insuranceStore: InsuranceStore,
        private _patientsStore: PatientsStore,
        private _phoneFormatPipe: PhoneFormatPipe,
        private _faxNoFormatPipe: FaxNoFormatPipe,
        private _elRef: ElementRef
    ) {
        this.patientId = this.sessionStore.session.user.id;
        // this._route.parent.parent.params.subscribe((routeParams: any) => {
        //     this.patientId = parseInt(routeParams.patientId);
        // });
        this._route.params.subscribe((routeParams: any) => {
            let insuranceId: number = parseInt(routeParams.id);
            this.progressBarService.show();
            let result = this._insuranceStore.fetchInsuranceById(insuranceId);
            result.subscribe(
                (insurance: any) => {
                    this.insurance = insurance.toJS();

                    this.loadInsuranceMasterAddress(this.insurance.insuranceMasterId);
                    this.policyCellPhone = this._phoneFormatPipe.transform(this.insurance.policyContact.cellPhone);
                    this.policyFaxNo = this._faxNoFormatPipe.transform(this.insurance.policyContact.faxNo);
                    this.insuranceCellPhone = this._phoneFormatPipe.transform(this.insurance.insuranceContact.cellPhone);
                    this.insuranceFaxNo = this._faxNoFormatPipe.transform(this.insurance.insuranceContact.faxNo);
                    // this.selectedInsuranceCity = insurance.insuranceAddress.city;
                    // this.selectedPolicyCity = insurance.policyAddress.city;
                    // this.loadInsuranceCities(insurance.insuranceAddress.state);
                    // this.loadPolicyCities(insurance.policyAddress.state);
                },
                (error) => {
                    this._router.navigate(['../../'], { relativeTo: this._route });
                    this.progressBarService.hide();
                },
                () => {
                    this.progressBarService.hide();
                });
        });
        // this._insuranceStore.getInsurancesMaster()
        //     .subscribe(
        //     (insuranceMasters) => {
        //         this.insuranceMasters = insuranceMasters;
        //         this.insuranceMasters.forEach(element => {
        //             this.insuranceMastersAdress = element.Address
        //         });
        //     });

        this.insuranceform = this.fb.group({
            policyNo: ['', Validators.required],
            policyOwner: ['', Validators.required],
            policyHolderName: ['', Validators.required],
            insuranceCompanyCode: [''],
            insuranceType: ['', Validators.required],
            insuranceMasterId: ['', Validators.required],
            contactPerson: ['', Validators.required],
            policyAddress: ['', Validators.required],
            policyAddress2: [''],
            policyState: [''],
            policyCity: [''],
            policyZipcode: [''],
            policyCountry: [''],
            policyEmail: ['', [Validators.required, AppValidators.emailValidator]],
            policyCellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            policyHomePhone: [''],
            policyWorkPhone: [''],
            policyFaxNo: [''],
            address: [],
            address2: [],
            state: [],
            city: [],
            zipcode: [],
            country: [],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            homePhone: [''],
            workPhone: [''],
            faxNo: ['']
        });

        this.insuranceformControls = this.insuranceform.controls;
    }
    ngOnInit() {
        this._statesStore.getStates()
            .subscribe(states => this.states = states);

        this._insuranceStore.getInsurancesMaster()
            .subscribe(insuranceMasters => this.insuranceMasters = insuranceMasters);

        // this.loadInsuranceMasterAddress(this.insurance.insuranceMasterId);

    }

    selectInsurance(event) {
        let currentInsurance: number = parseInt(event.target.value);
        if (currentInsurance !== 0) {
            this.loadInsuranceMasterAddress(currentInsurance);
        } else {
            this.insuranceMastersAdress = null
        }

    }

    loadInsuranceMasterAddress(currentInsurance) {
        this._insuranceStore.getInsuranceMasterById(currentInsurance)
            .subscribe(
            (insuranceMaster) => {
                this.insuranceMaster = insuranceMaster;
                this.insuranceMastersAdress = insuranceMaster.Address
            });
    }
    //     selectAdjusterState(event) {
    //      let currentState = event.target.value;
    //     if (currentState === this.adjuster.adjusterAddress.state) {
    //         this.loadCities(currentState);
    //         this.selectedCity = this.adjuster.adjusterAddress.city;
    //     } else {
    //     this.loadCities(currentState);
    //     this.selectedCity = '';
    //     }
    // }

    // loadCities(stateName) {
    //     this.isadjusterCitiesLoading = true;
    //     if (stateName !== '') {
    //         this._statesStore.getCitiesByStates(stateName)
    //             .subscribe((cities) => { this.adjusterCities = cities; },
    //             null,
    //             () => { this.isadjusterCitiesLoading = false; });
    //     } else {
    //         this.adjusterCities = [];
    //         this.isadjusterCitiesLoading = false;
    //     }
    // }

    // selectPolicyState(event) {
    //     let currentState = event.target.value;
    //     if (currentState === this.insurance.policyAddress.state) {
    //         this.loadPolicyCities(currentState);
    //         this.selectedPolicyCity = this.insurance.policyAddress.city;
    //     } else {
    //     this.loadPolicyCities(currentState);
    //     this.selectedPolicyCity = '';
    //     }
    // }
    // loadPolicyCities(stateName) {
    //     this.isPolicyCitiesLoading = true;
    //     if ( stateName !== '') {
    //     this._statesStore.getCitiesByStates(stateName)
    //             .subscribe((cities) => { this.policyCities = cities; },
    //             null,
    //             () => { this.isPolicyCitiesLoading = false; });
    //     } else {
    //         this.policyCities = [];
    //         this.isPolicyCitiesLoading = false;
    //     }
    // }
    // selectInsuranceState(event) {
    //     let currentState = event.target.value;
    //     if (currentState === this.insurance.insuranceAddress.state) {
    //         this.loadInsuranceCities(currentState);
    //         this.selectedInsuranceCity = this.insurance.insuranceAddress.city;
    //     } else {
    //     this.loadInsuranceCities(currentState);
    //     this.selectedInsuranceCity = '';
    //     }
    // }
    // loadInsuranceCities(stateName) {
    //     this.isInsuranceCitiesLoading = true;
    //     if ( stateName !== '') {
    //     this._statesStore.getCitiesByStates(stateName)
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
            id: this.insurance.id,
            patientId: this.patientId,
            policyHoldersName: insuranceformValues.policyHolderName,
            policyOwnerId: insuranceformValues.policyOwner,
            policyNo: insuranceformValues.policyNo,
            insuranceCompanyCode: insuranceformValues.insuranceCompanyCode,
            contactPerson: insuranceformValues.contactPerson,
            insuranceType: insuranceformValues.insuranceType,
            insuranceMasterId: parseInt(insuranceformValues.insuranceMasterId),
            policyContact: new Contact({
                cellPhone: insuranceformValues.policyCellPhone ? insuranceformValues.policyCellPhone.replace(/\-/g, '') : null,
                emailAddress: insuranceformValues.policyEmail,
                faxNo: insuranceformValues.policyFaxNo ? insuranceformValues.policyFaxNo.replace(/\-|\s/g, '') : null,
                homePhone: insuranceformValues.policyHomePhone,
                workPhone: insuranceformValues.policyWorkPhone
            }),
            policyAddress: new Address({
                address1: insuranceformValues.policyAddress,
                address2: insuranceformValues.policyAddress2,
                city: insuranceformValues.policyCity,
                country: insuranceformValues.policyCountry,
                state: insuranceformValues.policyState,
                zipCode: insuranceformValues.policyZipcode
            }),
            insuranceContact: new Contact({
                cellPhone: insuranceformValues.policyCellPhone ? insuranceformValues.policyCellPhone.replace(/\-/g, '') : null,
                emailAddress: insuranceformValues.policyEmail,
                faxNo: insuranceformValues.policyFaxNo ? insuranceformValues.policyFaxNo.replace(/\-|\s/g, '') : null,
                homePhone: insuranceformValues.policyHomePhone,
                workPhone: insuranceformValues.policyWorkPhone
            }),
            insuranceAddress: new Address({
                // address1: insuranceformValues.address,
                // address2: insuranceformValues.address2,
                // city: insuranceformValues.city,
                // country: insuranceformValues.country,
                // state: insuranceformValues.state,
                // zipCode: insuranceformValues.zipcode
            })
        });
        this.progressBarService.show();
        result = this._insuranceStore.updateInsurance(insurance);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Insurance updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to update Insurance.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this.notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this.progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this.progressBarService.hide();
            });
    }
}
